import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {ISignInCredentials, IUserCredentials} from './sign-in.service.models';
import {AuthenticationGuard} from '../../authentication/authentication.guard';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public signIn(model: ISignInCredentials): Observable<boolean> {
    return this.httpClient.post<IUserCredentials>('/api/authentication/validate', model).pipe(
      tap(response => this.authenticationGuard.credentials = response),
      map(v => true),
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

  public singOut(): void {
    this.authenticationGuard.credentials = null;
  }

}
