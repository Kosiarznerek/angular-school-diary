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

}
