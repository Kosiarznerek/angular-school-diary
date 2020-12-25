import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SubjectsService} from '../../../services/subjects/subjects.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsFormResolver implements Resolve<any> {

  constructor(
    private readonly subjectsService: SubjectsService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    const subjectId = Object.keys(route.params).includes('id')
      ? +route.params.id
      : null;

    return subjectId === null
      ? of(null)
      : this.subjectsService.getOne(subjectId);

  }

}
