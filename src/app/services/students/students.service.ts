import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IStudent} from './students.service.models';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getAll(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>('/api/students').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: `Name ${i + 1}`,
    //   surname: `Surname ${i + 1}`,
    //   address: `Address ${i + 1}`,
    //   phone: `Phone ${i + 1}`,
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getOne(studentId: number): Observable<IStudent> {
    return this.httpClient.get<IStudent>('/api/students/' + studentId);
    // return of({
    //   id: studentId,
    //   name: `Name ${studentId}`,
    //   surname: `Surname ${studentId}`,
    //   address: `Address ${studentId}`,
    //   phone: `Phone ${studentId}`,
    // }).pipe(
    //   delay(500)
    // );
  }
}
