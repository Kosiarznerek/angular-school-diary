import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ISignInDto} from './sign-in.service.models';

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
