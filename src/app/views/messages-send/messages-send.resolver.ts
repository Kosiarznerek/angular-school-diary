import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesSendResolver implements Resolve<any> {

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
