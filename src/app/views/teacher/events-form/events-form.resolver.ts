import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {EventsService} from '../../../services/evets/events.service';
import {map} from 'rxjs/operators';
import {IClass} from '../../../services/lessons/lessons.service.models';
import {IEvent} from '../../../services/evets/events.service.models';

export interface IEventForm {
  classes: IClass[];
  event: IEvent;
}

@Injectable({
  providedIn: 'root'
})
export class EventsFormResolver implements Resolve<IEventForm> {

  constructor(
    private readonly eventsService: EventsService,
    private readonly lessonsService: LessonsService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<IEventForm> | Promise<IEventForm> | IEventForm {

    return forkJoin([
      this.lessonsService.getTeachersClasses(),
      Object.keys(route.params).includes('eventId')
        ? this.eventsService.getOne(+route.params.eventId)
        : of(null)
    ]).pipe(map(([classes, event]) => ({
      classes,
      event
    })));

  }

}
