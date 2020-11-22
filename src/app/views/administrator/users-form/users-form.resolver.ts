import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../../../services/users/users.service';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserBaseData, IUserDetailsData} from '../../../services/users/users.service.models';
import {map} from 'rxjs/operators';
import {ISubject} from '../../../services/subjects/subjects.service.models';
import {SubjectsService} from '../../../services/subjects/subjects.service';

export interface IUserFormData {
  parents: IUserBaseData[];
  children: IUserBaseData[];
  subjects: ISubject[];
  user?: IUserDetailsData;
}

@Injectable({
  providedIn: 'root'
})
export class UsersFormResolver implements Resolve<IUserFormData> {

  constructor(
    private readonly usersService: UsersService,
    private readonly subjectsService: SubjectsService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    const parents$ = this.usersService.getAll({parent: true});
    const children$ = this.usersService.getAll({student: true});
    const subjects$ = this.subjectsService.getAll();

    const user$ = Object.keys(route.params).includes('id')
      ? this.usersService.getDetails(+route.params.id)
      : of(null);

    return forkJoin([
      parents$,
      children$,
      subjects$,
      user$,
    ]).pipe(map(([parents, children, subjects, user]) => ({
      parents,
      children,
      subjects,
      user,
    })));

  }

}
