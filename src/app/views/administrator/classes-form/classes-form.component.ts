import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IClassesFormData} from './classes-form.resolver';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {IClass, IPerson} from '../../../services/classes/classes.service.models';
import {IUserBaseData} from '../../../services/users/users.service.models';
import {takeUntil} from 'rxjs/operators';
import {ClassesService} from '../../../services/classes/classes.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit, OnDestroy {

  public readonly classForm: FormGroup;
  public tutorTeachers: IPerson[];

  public readonly studentsFilterControl: FormControl;
  public readonly filteredStudents: ReplaySubject<IPerson[]>;

  private readonly onDestroy: Subject<void>;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly classesService: ClassesService,
  ) {

    this.onDestroy = new Subject<void>();

    this.classForm = this.formBuilder.group({
      id: null,
      tutor: [null, Validators.required],
      students: [[], Validators.required],
      year: [null, Validators.required],
      symbol: [null, Validators.required],
    });

    this.studentsFilterControl = new FormControl();
    this.filteredStudents = new ReplaySubject<IUserBaseData[]>(1);
    this.filteredStudents.next(this.activatedRouteData.students.slice());
    this.studentsFilterControl.valueChanges.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => this.filterStudents());

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.classForm.patchValue(this.activatedRouteData.classData);
    }

    this.tutorTeachers = this.activatedRouteData.teachers;
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData.classData !== null;
  }

  public get activatedRouteData(): IClassesFormData {
    return this.activatedRoute.snapshot.data.data;
  }

  public personComparisonFunction(option: IPerson, value?: IPerson): boolean {
    return option.id === value?.id;
  }

  private filterStudents(): void {
    const {students} = this.activatedRouteData;
    let search = this.studentsFilterControl.value;
    if (!search) {
      this.filteredStudents.next(students.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredStudents.next(
      students.filter(({name, surname}) => `${name} ${surname}`.toLowerCase().indexOf(search) > -1)
    );
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate([
      this.isEditMode ? '../../table' : '../table'
    ], {
      relativeTo: this.activatedRoute
    });
  }

  public async onSaveButtonClick(): Promise<void> {
    const formValue: IClass = this.classForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.classesService.update(formValue).toPromise()
      : await this.classesService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? '../../table' : '../table'
      ], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
