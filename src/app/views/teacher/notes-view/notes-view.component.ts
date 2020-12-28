import {Component, OnInit} from '@angular/core';
import {NotesService} from '../../../services/notes/notes.service';
import {INote, IStudent} from '../../../services/notes/notes.service.models';
import {forkJoin} from 'rxjs';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.scss']
})
export class NotesViewComponent implements OnInit {

  public notes: INote[];
  public students: IStudent[];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly notesService: NotesService,
  ) {

    this.notes = null;

  }

  ngOnInit(): void {
    forkJoin([
      this.notesService.getTeachersNotes(),
      this.notesService.getAllStudents(),
    ]).subscribe(([notes, students]) => {
      this.notes = notes;
      this.students = students;
    });
  }

  public async onNoteDeleteButtonClick(note: INote): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć uwagę ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.notesService.remove(note.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      this.notesService.getTeachersNotes().subscribe(response => {
        this.notes = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
