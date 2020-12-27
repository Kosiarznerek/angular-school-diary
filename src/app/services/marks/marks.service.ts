import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IClass, IMark, ISchedule, IStudentMark} from './marks.service.models';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthenticationGuard} from '../../authentication/authentication.guard';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getTeachersClasses(): Observable<IClass[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<IClass[]>(`/api/marks/classes/${detailsId}`).pipe(
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
    return this.httpClient.get<ISchedule[]>(`/api/marks/schedules/${classId}/${detailsId}`).pipe(
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

  public getTeachersMarks(scheduleId: number): Observable<IMark[]> {
    return this.httpClient.get<IMark[]>(`/api/marks/${scheduleId}`).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((sv, si) => ({
    //   studentId: si + 1,
    //   studentName: ['Jan', 'Marta', 'Tomek'][Math.floor(Math.random() * 3)],
    //   studentSurname: ['Miodek', 'Nowak', 'Kowalski'][Math.floor(Math.random() * 3)],
    //   marks: new Array(5).fill(0).map((mv, mi) => ({
    //     id: si * (mi + 1),
    //     mark: Math.floor(Math.random() * 5) + 1,
    //     weight: Math.floor(Math.random() * 3) + 1,
    //     dateOfIssue: '2020-02-01',
    //     comment: 'Testowy komentarz'
    //   }))
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getOne(markId: number): Observable<IStudentMark> {
    return this.httpClient.get<IStudentMark>(`/api/marks/getone/${markId}`);
    // return of({
    //   id: markId,
    //   studentId: Math.floor(Math.random() * 5) + 1,
    //   scheduleId: Math.floor(Math.random() * 5) + 1,
    //   mark: Math.floor(Math.random() * 5) + 1,
    //   weight: Math.floor(Math.random() * 5) + 1,
    //   comment: 'Testowy komentarz',
    // }).pipe(
    //   delay(500)
    // );
  }

  public remove(markId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/marks/${markId}`).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public insert(mark: IStudentMark): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/marks', mark).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(mark: IStudentMark): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/marks', mark).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

}
