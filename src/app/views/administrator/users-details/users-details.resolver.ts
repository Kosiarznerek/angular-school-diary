import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../../../services/users/users.service';
import {Observable} from 'rxjs';
import {IUserDetailsData} from '../../../services/users/users.service.models';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailsResolver implements Resolve<IUserDetailsData> {

  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.usersService.getDetails(+route.params.id);
  }

}
