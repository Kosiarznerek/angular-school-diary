import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IClass, IClassInformation, IPerson} from './classes.service.models';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getTeachers(): Observable<IPerson[]> {
    return this.httpClient.get<IPerson[]>('/api/classes/teachers').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: `Teacher name ${i + 1}`,
    //   surname: `Teacher surname ${i + 1}`,
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getStudents(): Observable<IPerson[]> {
    return this.httpClient.get<IPerson[]>('/api/classes/students').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: `Student name ${i + 1}`,
    //   surname: `Student surname ${i + 1}`,
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getAll(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>('/api/classes').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   tutor: {
    //     id: Math.floor(Math.random() * 10) + 1,
    //     name: `Random name: ${i + 1}`,
    //     surname: `Random surname: ${i + 1}`,
    //   },
    //   students: new Array(Math.floor(Math.random() * 20)).fill(0).map((a, b) => ({
    //     id: b + 1,
    //     name: `Random name: ${b + 1}`,
    //     surname: `Random surname: ${b + 1}`,
    //   })),
    //   year: Math.floor(Math.random() * 8) + 1,
    //   symbol: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
    // }))).pipe(
    //   delay(500)
    // );
  }

  public getOne(id: number): Observable<IClass> {
    return this.httpClient.get<IClass>(`/api/classes/${id}`);
    // return of({
    //   id,
    //   tutor: {
    //     id: Math.floor(Math.random() * 10) + 1,
    //     name: `Jan`,
    //     surname: `Kowalski`,
    //   },
    //   students: new Array(3).fill(0).map((a, b) => ({
    //     id: b + 1,
    //     name: `Random name: ${b + 1}`,
    //     surname: `Random surname: ${b + 1}`,
    //   })),
    //   year: Math.floor(Math.random() * 8) + 1,
    //   symbol: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
    // }).pipe(
    //   delay(500)
    // );
  }

  public insert(classModel: IClass): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/classes', classModel).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(classModel: IClass): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/classes', classModel).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public remove(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/classes/${id}`).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public getStudentClassInformation(studentId: number): Observable<IClassInformation> {
    return this.httpClient.get<number>(`/api/classes/student/${studentId}`).pipe(
      switchMap(classId => this.getAll().pipe(
        map(allClasses => allClasses.find(c => c.id === classId)),
        map(classData => classData
          ? {
            year: classData.year,
            symbol: classData.symbol,
            teacherName: classData.tutor.name,
            teacherSurname: classData.tutor.surname
          }
          : undefined
        )
      )),
    );
    // return of({
    //   year: Math.floor(Math.random() * 8) + 1,
    //   symbol: 'A',
    //   teacherName: 'Jan',
    //   teacherSurname: 'Kowalski'
    // }).pipe(
    //   delay(500)
    // );
  }

}
