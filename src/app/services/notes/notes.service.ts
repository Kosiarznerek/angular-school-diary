import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {INote, IStudent} from './notes.service.models';
import {catchError, delay} from 'rxjs/operators';
import {AuthenticationGuard} from '../../authentication/authentication.guard';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getAllStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>('/api/notes/students').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: `Name ${i + 1}`,
    //   surname: `Surname ${i + 1}`,
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getTeachersNotes(): Observable<INote[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<INote[]>(`/api/notes/teacher/${detailsId}`).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   teacherId: detailsId,
    //   studentId: Math.floor(Math.random() * 10) + 1,
    //   content: 'Note content'
    // }))).pipe(
    //   delay(500)
    // );
  }

  public insert(model: INote): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/notes', model).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(model: INote): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/notes', model).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public remove(nodeId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('/api/notes/' + nodeId).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public getOne(nodeId: number): Observable<INote> {
    return of({
      id: nodeId,
      teacherId: this.authenticationGuard.credentials.detailsId,
      studentId: Math.floor(Math.random() * 10) + 1,
      content: 'Note content'
    }).pipe(
      delay(500)
    );
  }

}
