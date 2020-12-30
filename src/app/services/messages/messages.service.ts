import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IMessage} from './messages.service.models';
import {catchError} from 'rxjs/operators';
import {AuthenticationGuard} from '../../authentication/authentication.guard';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getReceivedMessages(): Observable<IMessage[]> {
    const {userId} = this.authenticationGuard.credentials;
    return this.httpClient.get<IMessage[]>('/api/messages/' + userId).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(10).fill(0).map((v, i) => ({
    //   userId: Math.floor(Math.random() * 18) + 38,
    //   date: '2020-09-10',
    //   topic: `Random topic ${i + 1}`,
    //   content: `Radom content ${i + 1}`
    // }))).pipe(
    //   delay(500)
    // );
  }

  public sendMessage(model: IMessage): Observable<boolean> {
    const {userId} = this.authenticationGuard.credentials;
    return this.httpClient.post<boolean>('/api/messages/' + userId, model).pipe(
      catchError(() => of(false))
    );
    // return of(true).pipe(
    //   delay(500)
    // );
  }

}
