import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ClassesService} from '../../../services/classes/classes.service';
import {IClass, IPerson} from '../../../services/classes/classes.service.models';

export interface IClassesFormData {
  students: IPerson[];
  teachers: IPerson[];
  classData: IClass;
}

@Injectable({
  providedIn: 'root'
})
export class ClassesFormResolver implements Resolve<IClassesFormData> {

  constructor(
    private readonly classesService: ClassesService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    const students$ = this.classesService.getStudents();
    const teachers$ = this.classesService.getTeachers();

    const classData$ = Object.keys(route.params).includes('id')
      ? this.classesService.getOne(+route.params.id)
      : of(null);

    return forkJoin([
      students$,
      teachers$,
      classData$,
    ]).pipe(map(([students, teachers, classData]) => ({
      students,
      teachers,
      classData,
    })));

  }

}
