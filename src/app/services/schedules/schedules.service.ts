import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ISchedule, ITeacherSubject} from './schedules.service.models';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getTeachersSubjects(): Observable<ITeacherSubject[]> {
    return this.httpClient.get<ITeacherSubject[]>('/api/schedules/subjects').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: ['Matematyka', 'Fizyka', 'Chemia'][Math.floor(Math.random() * 3)],
    //   profile: Math.random() < 0.5 ? 'Basic' : 'Advanced' as 'Basic',
    //   teacherName: ['Jan', 'Tomasz', 'Grzegorz'][Math.floor(Math.random() * 3)],
    //   teacherSurname: ['Kowalski', 'Miodek', 'Kwiatek'][Math.floor(Math.random() * 3)],
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getAll(classId: number): Observable<ISchedule[]> {
    return this.httpClient.get<ISchedule[]>(`/api/schedules/classes/${classId}`).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   classId,
    //   subject: {
    //     id: Math.floor(Math.random() * 4),
    //     name: ['Matematyka', 'Chemia', 'Fizyka'][Math.floor(Math.random() * 3)],
    //     profile: Math.random() < 0.5 ? 'Basic' : 'Advanced' as 'Basic',
    //     teacherName: ['Jan', 'Tomasz', 'Grzegorz'][Math.floor(Math.random() * 3)],
    //     teacherSurname: ['Kowalski', 'Miodek', 'Kwiatek'][Math.floor(Math.random() * 3)],
    //   },
    //   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)] as 'Monday',
    //   roomNumber: Math.floor(Math.random() * 100),
    //   hourStart: '11:23:23',
    //   hourEnd: '14:24:43',
    //   dateStart: '2020-01-12',
    //   dateEnd: '2020-02-22',
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getOne(scheduleId: number): Observable<ISchedule> {
    return this.httpClient.get<ISchedule>(`/api/schedules/${scheduleId}`);
    // return of({
    //   id: scheduleId,
    //   classId: 1,
    //   subject: {
    //     id: Math.floor(Math.random() * 4),
    //     name: ['Matematyka', 'Chemia', 'Fizyka'][Math.floor(Math.random() * 3)],
    //     profile: Math.random() < 0.5 ? 'Basic' : 'Advanced' as 'Basic',
    //     teacherName: ['Jan', 'Tomasz', 'Grzegorz'][Math.floor(Math.random() * 3)],
    //     teacherSurname: ['Kowalski', 'Miodek', 'Kwiatek'][Math.floor(Math.random() * 3)],
    //   },
    //   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)] as 'Monday',
    //   roomNumber: Math.floor(Math.random() * 100),
    //   hourStart: '11:23:23',
    //   hourEnd: '14:24:43',
    //   dateStart: '2020-01-12',
    //   dateEnd: '2020-01-22',
    // }).pipe(
    //   delay(500)
    // );
  }

  public remove(scheduleId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/schedules/${scheduleId}`).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public insert(model: ISchedule): Observable<boolean> {
    return this.httpClient.post<boolean>(`/api/schedules`, Object.assign(
      {},
      model,
      {
        hourStart: new Date(`1.1.1970 ${model.hourStart}`).valueOf(),
        hourEnd: new Date(`1.1.1970 ${model.hourEnd}`).valueOf(),
        dateStart: new Date(model.dateStart).valueOf(),
        dateEnd: new Date(model.dateEnd).valueOf(),
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(model: ISchedule): Observable<boolean> {
    return this.httpClient.put<boolean>(`/api/schedules`, Object.assign(
      {},
      model,
      {
        hourStart: new Date(`1.1.1970 ${model.hourStart}`).valueOf(),
        hourEnd: new Date(`1.1.1970 ${model.hourEnd}`).valueOf(),
        dateStart: new Date(model.dateStart).valueOf(),
        dateEnd: new Date(model.dateEnd).valueOf(),
      }
    )).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

}
