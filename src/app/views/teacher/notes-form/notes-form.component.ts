import {Component, OnInit} from '@angular/core';
import {NotesService} from '../../../services/notes/notes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {INoteForm} from './notes-form.resolver';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationGuard} from '../../../authentication/authentication.guard';
import {INote, IStudent} from '../../../services/notes/notes.service.models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {

  public readonly noteForm: FormGroup;
  public readonly students: IStudent[];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly notesService: NotesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {

    this.noteForm = this.formBuilder.group({
      id: [null],
      teacherId: [this.authenticationGuard.credentials.detailsId, Validators.required],
      studentId: [null, Validators.required],
      content: [null, Validators.required]
    });
    this.students = this.activatedRouteData.students;

  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.noteForm.patchValue(this.activatedRouteData.note);
    }
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData.note instanceof Object;
  }

  private get activatedRouteData(): INoteForm {
    return this.activatedRoute.snapshot.data.data;
  }

  public async onSaveButtonClick(): Promise<void> {
    const formValue: INote = this.noteForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.notesService.update(formValue).toPromise()
      : await this.notesService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? '../../view' : '../view'
      ], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
