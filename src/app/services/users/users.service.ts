import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IUserListItemDto} from './users.service.models';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
  }

  public getAllUsers(): Observable<IUserListItemDto[]> {
    return of(new Array(200).fill(0).map((v, i) => ({
      id: i + 1,
      login: `testLogin${i + 1}`,
      accountType: ['student', 'parent', 'teacher', 'administrator'][i % 4] as any,
      name: `Name ${i + 1}`,
      surname: `Surname ${i + 1}`,
    }))).pipe(
      delay(500)
    );
  }

}
