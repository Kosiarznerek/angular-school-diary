import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ILesson, IStudent} from '../../../services/lessons/lessons.service.models';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent implements OnInit {

  public readonly lessonForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly lessonsService: LessonsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    const {scheduleId, lessonId} = this.activatedRoute.snapshot.params;
    this.lessonForm = this.formBuilder.group({
      lessonId: [this.isEditMode ? +lessonId : null],
      scheduleId: [+scheduleId, Validators.required],
      topic: [null, Validators.required],
      date: [null, Validators.required],
      students: this.formBuilder.array([]),
    });

  }

  ngOnInit(): void {
    const studentsArray = this.lessonForm.controls.students as FormArray;

    if (this.isEditMode) {
      const lesson = this.activatedRouteData as ILesson;
      lesson.students.forEach(student => studentsArray.push(this.formBuilder.group({
        studentId: [student.studentId, Validators.required],
        isPresent: student.isPresent,
        studentName: new FormControl({value: student.studentName, disabled: true}),
        studentSurname: new FormControl({value: student.studentSurname, disabled: true}),
      })));
      this.lessonForm.patchValue(lesson);
    } else {
      const students = this.activatedRouteData as IStudent[];
      students.forEach(student => studentsArray.push(this.formBuilder.group({
        studentId: [student.id, Validators.required],
        isPresent: true,
        studentName: [student.name, Validators.required],
        studentSurname: [student.surname, Validators.required]
      })));
    }

  }

  public get isEditMode(): boolean {
    return !(this.activatedRouteData instanceof Array);
  }

  public get activatedRouteData(): IStudent[] | ILesson {
    return this.activatedRoute.snapshot.data.data;
  }

  public async onFormSaveButtonClick(): Promise<void> {
    const formValue: ILesson = this.lessonForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.lessonsService.update(formValue).toPromise()
      : await this.lessonsService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? './../details' : '../'
      ], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
