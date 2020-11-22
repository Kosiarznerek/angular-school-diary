import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../../../services/users/users.service';
import {Observable} from 'rxjs';
import {IUserBaseData} from '../../../services/users/users.service.models';

@Injectable({
  providedIn: 'root'
})
export class UsersTableResolver implements Resolve<IUserBaseData> {

  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.usersService.getAll({
      student: true,
      parent: true,
      teacher: true,
      administrator: true,
    });
  }

}
