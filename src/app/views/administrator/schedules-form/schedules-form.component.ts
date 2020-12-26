import {Component, OnInit} from '@angular/core';
import {ISchedulesFormData} from './schedules-form.resolver';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISchedule, ITeacherSubject} from '../../../services/schedules/schedules.service.models';
import {SchedulesService} from '../../../services/schedules/schedules.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.scss']
})
export class SchedulesFormComponent implements OnInit {

  public readonly scheduleForm: FormGroup;
  public readonly subjects: ITeacherSubject[];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly schedulesService: SchedulesService,
  ) {

    this.scheduleForm = this.formBuilder.group({
      id: [null],
      classId: [this.classId, Validators.required],
      subject: [null, Validators.required],
      dayOfWeek: [null, Validators.required],
      roomNumber: [null, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(500),
      ])],
      hourStart: [null, Validators.required],
      hourEnd: [null, Validators.required],
      dateStart: [null, Validators.required],
      dateEnd: [null, Validators.required],
    });
    this.subjects = this.activatedRouteData.subjects;

  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.scheduleForm.patchValue(this.activatedRouteData.schedule);
    }
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData.schedule !== null;
  }

  public get classId(): number {
    return +this.activatedRoute.snapshot.params.classId;
  }

  public get activatedRouteData(): ISchedulesFormData {
    return this.activatedRoute.snapshot.data.data;
  }

  public subjectComparisonFunction(option: ITeacherSubject, value?: ITeacherSubject): boolean {
    return option.id === value?.id;
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate([
      this.isEditMode ? '../../view' : '../view'
    ], {
      relativeTo: this.activatedRoute
    });
  }

  public async onSaveButtonClick(): Promise<void> {
    const formValue: ISchedule = this.scheduleForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.schedulesService.update(formValue).toPromise()
      : await this.schedulesService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? '../../view' : '../view'
      ], {
        relativeTo: this.activatedRoute
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
