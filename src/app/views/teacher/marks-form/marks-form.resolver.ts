import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MarksService} from '../../../services/marks/marks.service';

@Injectable({
  providedIn: 'root'
})
export class MarksFormResolver implements Resolve<any> {

  constructor(
    private readonly marksService: MarksService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return Object.keys(route.params).includes('markId')
      ? this.marksService.getOne(+route.params.markId)
      : of(null);

  }

}
