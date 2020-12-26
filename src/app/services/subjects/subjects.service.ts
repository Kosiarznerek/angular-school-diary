import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ISubject} from './subjects.service.models';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getAll(): Observable<ISubject[]> {
    return this.httpClient.get<ISubject[]>('/api/subjects').pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   id: i + 1,
    //   name: `Przedmiot ${i + 1}`,
    // }))).pipe(
    //   delay(100)
    // );
  }

  public getOne(id: number): Observable<ISubject> {
    return this.httpClient.get<ISubject>(`/api/subjects/${id}`);
    // return of({
    //   id,
    //   name: `Przedmiot ${id}`,
    // }).pipe(
    //   delay(100)
    // );
  }

  public remove(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/subjects/${id}`).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public insert(subject: ISubject): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/subjects', subject).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public update(subject: ISubject): Observable<boolean> {
    return this.httpClient.put<boolean>('/api/subjects', subject).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

}
