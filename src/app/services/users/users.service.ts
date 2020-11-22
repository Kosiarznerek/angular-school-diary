import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IUserBaseData, IUserDetailsData, IUserFilter} from './users.service.models';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
  }

  public getAll(filter: IUserFilter): Observable<IUserBaseData[]> {
    const allowedAccountTypes = Object.keys(filter).filter(value => filter[value]);
    return of(new Array(200).fill(0).map((v, i) => ({
      id: i + 1,
      login: `testLogin${i + 1}`,
      accountType: allowedAccountTypes[i % allowedAccountTypes.length] as any,
      name: `Imię ${i + 1}`,
      surname: `Nazwisko ${i + 1}`,
    }))).pipe(
      delay(100)
    );
  }

  public delete(userId: number): Observable<boolean> {
    return of(true).pipe(
      delay(100)
    );
  }

  public getDetails(userId: number): Observable<IUserDetailsData> {
    return of({
      id: userId,
      login: 'losowyLogin',
      accountType: 'teacher' as any,
      name: 'Jan',
      surname: 'Kowalski',
      address: 'Kraków, ul. Miodowa 44',
      phone: '531-929-164',
      email: 'jkowalski@gmail.com',
      parentIds: [1, 3, 5],
      childrenIds: [2, 4, 6],
      subjects: new Array(3).fill(0).map((v, i) => ({
        subjectId: i + 1,
        profile: ['basic', 'advanced'][i % 2] as any
      }))
    }).pipe(
      delay(500)
    );
  }

  public update(model: IUserDetailsData): Observable<boolean> {
    return of(true).pipe(
      delay(100)
    );
  }

}
