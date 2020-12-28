import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LessonsService} from '../../../services/lessons/lessons.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsFormResolver implements Resolve<any> {

  constructor(
    private readonly lessonsService: LessonsService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return Object.keys(route.params).includes('lessonId')
      ? this.lessonsService.getOne(+route.params.lessonId)
      : this.lessonsService.getStudentsInClass(+route.params.scheduleId);

  }

}
