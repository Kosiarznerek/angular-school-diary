import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MarksService} from '../../../services/marks/marks.service';
import {IStudentMark} from '../../../services/marks/marks.service.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-marks-form',
  templateUrl: './marks-form.component.html',
  styleUrls: ['./marks-form.component.scss']
})
export class MarksFormComponent implements OnInit {

  public readonly markForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly marksService: MarksService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.markForm = this.formBuilder.group({
      id: [this.isEditMode ? this.activatedRouteData.id : null],
      studentId: [+this.activatedRoute.snapshot.params.studentId, Validators.required],
      scheduleId: [+this.activatedRoute.snapshot.params.scheduleId, Validators.required],
      mark: [null, Validators.required],
      weight: [null, Validators.required],
      comment: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.markForm.patchValue(this.activatedRouteData);
    }
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData !== null;
  }

  public get activatedRouteData(): IStudentMark {
    return this.activatedRoute.snapshot.data.data;
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate([
      this.isEditMode ? '../../../' : '../../'
    ], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onSaveButtonClick(): Promise<void> {
    const formValue: IStudentMark = this.markForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.marksService.update(formValue).toPromise()
      : await this.marksService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? '../../../' : '../../'
      ], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
