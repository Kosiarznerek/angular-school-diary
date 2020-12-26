import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationGuard} from './authentication.guard';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {credentials} = this.authenticationGuard;
    const httpRequest = request.clone({
      headers: request.headers
        .append('authentication-type', credentials?.type ?? '')
        .append('authentication-user-id', credentials?.userId.toString() ?? '')
        .append('authentication-details-id', credentials?.detailsId.toString() ?? '')
    });
    return next.handle(httpRequest);
  }
}
