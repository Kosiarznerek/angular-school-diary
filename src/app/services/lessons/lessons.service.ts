import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IClass, ILesson, ISchedule, IStudent} from './lessons.service.models';
import {HttpClient} from '@angular/common/http';
import {AuthenticationGuard} from '../../authentication/authentication.guard';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getTeachersClasses(): Observable<IClass[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<IClass[]>(`/api/lessons/classes/${detailsId}`).pipe(
      map(v => v.filter((item, pos) => v.findIndex(r => r.id === item.id) === pos)),
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   year: Math.floor(Math.random() * 8) + 1,
    //   symbol: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getTeachersSchedules(classId: number): Observable<ISchedule[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<ISchedule[]>(`/api/lessons/schedules/${classId}/${detailsId}`).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   subjectName: ['Matematyka', 'Chemia', 'Fizyka'][Math.floor(Math.random() * 3)],
    //   subjectProfile: Math.random() < 0.5 ? 'Basic' : 'Advanced' as 'Basic',
    //   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)] as 'Monday',
    //   roomNumber: Math.floor(Math.random() * 100),
    //   hourStart: '11:23:23',
    //   hourEnd: '14:24:43',
    //   dateStart: '2020-01-12',
    //   dateEnd: '2020-01-22',
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getAll(scheduleId: number): Observable<ILesson[]> {
    return this.httpClient.get<ILesson[]>(`/api/lessons/${scheduleId}`).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   lessonId: i + 1,
    //   scheduleId: Math.floor(Math.random() * 10),
    //   topic: 'Random topic',
    //   date: '2020-02-10',
    //   students: []
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getOne(lessonId: number): Observable<ILesson> {
    return this.httpClient.get<ILesson>(`/api/lessons/getOne/${lessonId}`);
    // return of({
    //   lessonId,
    //   scheduleId: Math.floor(Math.random() * 10),
    //   topic: 'Random topic',
    //   date: '2020-02-10',
    //   students: new Array(10).fill(0).map((v, i) => ({
    //     studentId: i + 1,
    //     isPresent: Math.random() < 0.5,
    //     studentName: `Name ${i + 1}`,
    //     studentSurname: `Surname ${i + 1}`,
    //   }))
    // }).pipe(
    //   delay(500)
    // );
  }

  public getStudentsInClass(scheduleId: number): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(`/api/lessons/students/${scheduleId}`).pipe(
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

  public insert(model: ILesson): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/lessons', Object.assign(
      {},
      model,
      {
        date: new Date(model.date).valueOf()
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(model: ILesson): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/lessons', Object.assign(
      {},
      model,
      {
        date: new Date(model.date).valueOf()
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

}
