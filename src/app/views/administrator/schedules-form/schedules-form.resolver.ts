import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ISchedule, ITeacherSubject} from '../../../services/schedules/schedules.service.models';
import {SchedulesService} from '../../../services/schedules/schedules.service';
import {map} from 'rxjs/operators';

export interface ISchedulesFormData {
  subjects: ITeacherSubject[];
  schedule: ISchedule;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesFormResolver implements Resolve<any> {

  constructor(
    private readonly schedulesService: SchedulesService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    const subjects$ = this.schedulesService.getTeachersSubjects();
    const schedule$ = Object.keys(route.params).includes('scheduleId')
      ? this.schedulesService.getOne(+route.params.scheduleId)
      : of(null);

    return forkJoin([
      subjects$,
      schedule$,
    ]).pipe(map(([subjects, schedule]) => ({
      subjects,
      schedule,
    })));

  }

}
