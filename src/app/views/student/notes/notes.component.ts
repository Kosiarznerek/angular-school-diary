import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../../../services/notes/notes.service';
import {INoteDetails} from '../../../services/notes/notes.service.models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public notes: INoteDetails[];

  constructor(
    private readonly notesService: NotesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.notes = null;

  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.notesService.getStudentNotes(studentId).subscribe(response => {
      this.notes = response;
    });
  }

}
