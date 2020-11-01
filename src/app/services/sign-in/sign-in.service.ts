import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

export interface ISignInDto {
  login: string;
  password: string;
  type: 'student' | 'parent' | 'teacher' | 'administrator';
}

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor() {
  }

  public signIn(model: ISignInDto): Observable<boolean> {
    return of(true).pipe(
      delay(500)
    );
  }

}
