import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {NotesService} from '../../../services/notes/notes.service';
import {INote, IStudent} from '../../../services/notes/notes.service.models';
import {map} from 'rxjs/operators';

export interface INoteForm {
  students: IStudent[];
  note: INote;
}

@Injectable({
  providedIn: 'root'
})
export class NotesFormResolver implements Resolve<INoteForm> {

  constructor(
    private readonly notesService: NotesService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<INoteForm> | Promise<INoteForm> | INoteForm {

    return forkJoin([
      this.notesService.getAllStudents(),
      Object.keys(route.params).includes('noteId')
        ? this.notesService.getOne(+route.params.noteId)
        : of(null)
    ]).pipe(
      map(([students, note]) => ({students, note}))
    );

  }

}
