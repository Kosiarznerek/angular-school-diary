import {Injectable} from '@angular/core';
import {AuthenticationGuard} from '../../authentication/authentication.guard';
import {Observable, of} from 'rxjs';
import {IEvent, IStudentEvent} from './events.service.models';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getTeachersEvents(): Observable<IEvent[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<IEvent[]>('/api/events/' + detailsId).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(10).map((v, i) => ({
    //   id: i + 1,
    //   teacherId: detailsId,
    //   classId: [6, 7][Math.floor(Math.random() * 2)],
    //   date: '2020-02-20',
    //   description: 'Random description',
    //   type: ['Test',
    //     'Card',
    //     'Interview',
    //     'Trip',
    //     'ClassCanceled',
    //     'Substitute'][Math.floor(Math.random() * 6)] as 'Card',
    //   priority: ['Low',
    //     'Medium',
    //     'High'][Math.floor(Math.random() * 3)] as 'Low',
    // })));
  }

  public getOne(eventId: number): Observable<IEvent> {
    return this.httpClient.get<IEvent>('/api/events/getOne/' + eventId);
    // return of({
    //   id: eventId,
    //   teacherId: Math.floor(Math.random() * 100),
    //   classId: [6, 7][Math.floor(Math.random() * 2)],
    //   date: '2020-02-20',
    //   description: 'Random description',
    //   type: ['Test',
    //     'Card',
    //     'Interview',
    //     'Trip',
    //     'ClassCanceled',
    //     'Substitute'][Math.floor(Math.random() * 6)] as 'Card',
    //   priority: ['Low',
    //     'Medium',
    //     'High'][Math.floor(Math.random() * 3)] as 'Low',
    // }).pipe(
    //   delay(500)
    // );
  }

  public insert(model: IEvent): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/events', Object.assign(
      {},
      model,
      {
        date: new Date(model.date).valueOf(),
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(model: IEvent): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/events', Object.assign(
      {},
      model,
      {
        date: new Date(model.date).valueOf(),
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public remove(eventId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('/api/events/' + eventId).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public getStudentEvents(studentId: number): Observable<IStudentEvent[]> {
    return this.httpClient.get<IStudentEvent[]>('/api/events/student/' + studentId).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(10).map((v, i) => ({
    //   teacherName: 'teacherName',
    //   teacherSurname: 'teacherSurname',
    //   date: '2020-02-20',
    //   description: 'Random description',
    //   type: ['Test',
    //     'Card',
    //     'Interview',
    //     'Trip',
    //     'ClassCanceled',
    //     'Substitute'][Math.floor(Math.random() * 6)] as 'Card',
    //   priority: ['Low',
    //     'Medium',
    //     'High'][Math.floor(Math.random() * 3)] as 'Low',
    // }))).pipe(
    //   delay(500)
    // );
  }

}
