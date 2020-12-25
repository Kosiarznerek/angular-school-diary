import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubjectsService} from '../../../services/subjects/subjects.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ISubject} from '../../../services/subjects/subjects.service.models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-subjects-form',
  templateUrl: './subjects-form.component.html',
  styleUrls: ['./subjects-form.component.scss']
})
export class SubjectsFormComponent implements OnInit {

  public readonly subjectForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subjectsService: SubjectsService,
  ) {

    this.subjectForm = this.formBuilder.group({
      id: null,
      name: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])]
    });

  }

  ngOnInit(): void {

    if (this.isEditMode) {
      this.subjectForm.patchValue(this.activatedRouteData);
    }

  }

  public get isEditMode(): boolean {
    return this.activatedRouteData instanceof Object;
  }

  private get activatedRouteData(): ISubject {
    return this.activatedRoute.snapshot.data.data;
  }

  public async onSubjectSaveButtonClickHandler(): Promise<void> {
    const formValue: ISubject = this.subjectForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.subjectsService.update(formValue).toPromise()
      : await this.subjectsService.insert(formValue).toPromise();

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

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate([
      this.isEditMode ? '../../table' : '../table'
    ], {
      relativeTo: this.activatedRoute,
    });
  }

}
