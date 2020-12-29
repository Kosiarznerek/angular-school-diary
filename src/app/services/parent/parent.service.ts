import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IParentChild} from './parent.service.models';
import {AuthenticationGuard} from '../../authentication/authentication.guard';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {
  }

  public getParentChildren(): Observable<IParentChild[]> {
    const {detailsId} = this.authenticationGuard.credentials;
    return this.httpClient.get<IParentChild[]>('/api/parent/children/' + detailsId).pipe(
      catchError(() => of([]))
    );
    // return of(new Array(3).fill(0).map((v, i) => ({
    //   studentId: i + 1,
    //   name: `Name${i + 1}`,
    //   surname: `Surname${i + 1}`,
    // })));
  }

}
