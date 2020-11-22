import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ISubject} from './subjects.service.models';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() {
  }

  public getAll(): Observable<ISubject[]> {
    return of(new Array(10).fill(0).map((v, i) => ({
      id: i + 1,
      name: `Przedmiot ${i + 1}`,
    }))).pipe(
      delay(100)
    );
  }

}
