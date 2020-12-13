import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {IUserBaseData, IUserDetailsData} from '../../../services/users/users.service.models';
import {ReplaySubject, Subject} from 'rxjs';
import {IUserFormData} from './users-form.resolver';
import {takeUntil} from 'rxjs/operators';
import {ISubject} from '../../../services/subjects/subjects.service.models';
import {UsersService} from '../../../services/users/users.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  public readonly accountForm: FormGroup;
  public readonly detailsForm: FormGroup;

  public readonly parentsFilterControl: FormControl;
  public readonly filteredParents: ReplaySubject<IUserBaseData[]>;

  public readonly childrenFilterControl: FormControl;
  public readonly filteredChildren: ReplaySubject<IUserBaseData[]>;

  private readonly onDestroy: Subject<void>;

  constructor(
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly usersService: UsersService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.onDestroy = new Subject();

    this.accountForm = this.formBuilder.group({
      id: null,
      login: new FormControl({value: null, disabled: this.isEditMode}, Validators.required),
      password: [null, this.isEditMode ? null : Validators.required],
      accountType: new FormControl({value: null, disabled: this.isEditMode}, Validators.required),
    });

    this.detailsForm = this.formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      address: [null, this.validateForAccountTypes(['student', 'parent', 'teacher'], Validators.required)],
      phone: [null, this.validateForAccountTypes(['student', 'parent', 'teacher'], [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(11),
      ])],
      email: [null, this.validateForAccountTypes(['parent', 'teacher'], [
        Validators.email,
        Validators.required,
      ])],
      parentIds: [[]],
      childrenIds: [[]],
      subjects: this.formBuilder.array([]),
    });

    this.parentsFilterControl = new FormControl();
    this.filteredParents = new ReplaySubject<IUserBaseData[]>(1);
    this.filteredParents.next(this.activatedRouteData.parents.slice());
    this.parentsFilterControl.valueChanges.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => this.filterParents());

    this.childrenFilterControl = new FormControl();
    this.filteredChildren = new ReplaySubject<IUserBaseData[]>(1);
    this.filteredChildren.next(this.activatedRouteData.children.slice());
    this.childrenFilterControl.valueChanges.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => this.filterChildren());

  }

  ngOnInit(): void {
    if (!this.activatedRouteData.user) {
      return;
    }

    const {user} = this.activatedRouteData;
    this.accountForm.patchValue(user);
    this.detailsForm.patchValue(user);

    const formArray = this.detailsForm.get('subjects') as FormArray;
    user.subjects.map(value => formArray.controls.push(this.getSubjectFormGroup(
      value.subjectId,
      value.profile,
    )));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData.user !== null;
  }

  private get activatedRouteData(): IUserFormData {
    return this.activatedRoute.snapshot.data.data;
  }

  public async navigateToUsersTable(): Promise<void> {
    await this.router.navigate([this.isEditMode ? '../../table' : '../table'], {
      relativeTo: this.activatedRoute,
    });
  }

  public get isFormValid(): boolean {
    const {accountType} = this.accountForm.getRawValue();
    return accountType !== 'teacher'
      ? this.accountForm.valid && this.detailsForm.valid
      : this.accountForm.valid && this.detailsForm.valid &&
      !(this.detailsForm.get('subjects') as FormArray).controls.map(v => v.valid).includes(false);
  }

  private validateForAccountTypes(accountTypes: string | string[], validators: ValidatorFn | ValidatorFn[]): ValidatorFn {
    const allowedTypes: string[] = Array.isArray(accountTypes) ? accountTypes : [accountTypes];
    const applyValidators: ValidatorFn[] = Array.isArray(validators) ? validators : [validators];
    return (control) => {
      const {value: accountType, valueChanges} = this.accountForm.get('accountType');
      valueChanges.subscribe(() => control.updateValueAndValidity());
      return allowedTypes.includes(accountType)
        ? Validators.compose(applyValidators)(control)
        : null;
    };
  }

  private filterParents(): void {
    const {parents} = this.activatedRouteData;
    let search = this.parentsFilterControl.value;
    if (!search) {
      this.filteredParents.next(parents.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredParents.next(
      parents.filter(({name, surname}) => `${name} ${surname}`.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterChildren(): void {
    const {children} = this.activatedRouteData;
    let search = this.childrenFilterControl.value;
    if (!search) {
      this.filteredChildren.next(children.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredChildren.next(
      children.filter(({name, surname}) => `${name} ${surname}`.toLowerCase().indexOf(search) > -1)
    );
  }

  public getTeacherSubjectsList(index: number): ISubject[] {
    const formArray = this.detailsForm.get('subjects') as FormArray;
    const selectedSubjects: { subjectId: number; profile: string }[] = formArray.getRawValue();
    const {subjects: allSubjects} = this.activatedRouteData;
    return allSubjects.filter(subject => {
      const basic = selectedSubjects.find(v => v.subjectId === subject.id && v.profile === 'basic');
      const advanced = selectedSubjects.find(v => v.subjectId === subject.id && v.profile === 'advanced');
      return !(basic && advanced) || selectedSubjects[index]?.subjectId === subject.id;
    });
  }

  public getTeachersProfilesList(index: number): string[] {
    const formArray = this.detailsForm.get('subjects') as FormArray;
    const formGroup = formArray.controls[index] as FormGroup;
    const selectedSubjectId = formGroup.get('subjectId').value;
    const selectedProfile = formGroup.get('profile').value;
    if (!selectedSubjectId) {
      return [];
    }
    const selectedProfilesForSubject: string[] = formArray.getRawValue()
      .filter(v => v.subjectId === selectedSubjectId)
      .map(v => v.profile);
    return ['basic', 'advanced'].filter(v => !selectedProfilesForSubject.includes(v) || v === selectedProfile);
  }

  public onAddTeacherSubjectClickHandler(): void {
    const formArray = this.detailsForm.get('subjects') as FormArray;
    formArray.controls.push(this.getSubjectFormGroup());
  }

  private getSubjectFormGroup(subjectId: number = null, profile: 'basic' | 'advanced' = null): FormGroup {
    return this.formBuilder.group({
      subjectId: [subjectId, this.validateForAccountTypes('teacher', Validators.required)],
      profile: [profile, this.validateForAccountTypes('teacher', Validators.required)]
    });
  }

  public onDeleteTeacherSubject(index: number): void {
    const formArray = this.detailsForm.get('subjects') as FormArray;
    formArray.controls.splice(index, 1);
  }

  public async onFormSaveClickHandler(): Promise<void> {
    const model: IUserDetailsData = Object.assign(
      {},
      this.accountForm.getRawValue(),
      this.detailsForm.getRawValue()
    );

    this.accountForm.disable();
    this.detailsForm.disable();
    const isSuccess = this.isEditMode
      ? await this.usersService.update(model).toPromise()
      : await this.usersService.insert(model).toPromise();
    this.accountForm.enable();
    this.detailsForm.enable();

    if (isSuccess) {
      this.matSnackBar.open(`User ${this.isEditMode ? 'updated' : 'added'} successfully`);
      await this.navigateToUsersTable();
    } else {
      this.matSnackBar.open('Something went wrong');
    }
  }

}
