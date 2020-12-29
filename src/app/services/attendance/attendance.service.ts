import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IAttendance} from './attendance.service.models';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {SchedulesService} from '../schedules/schedules.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly httpClient: HttpClient,
  ) {
  }

  public getStudentAttendance(studentId: number): Observable<IAttendance[]> {
    return this.httpClient.get<IAttendance[]>('/api/attendance/' + studentId).pipe(
      switchMap(attendances => this.schedulesService.getTeachersSubjects().pipe(
        map(subjects => attendances.map(v => Object.assign(v, {
          subjectName: subjects.find(q => q.id === v.teacherSubjectId).name,
          subjectProfile: subjects.find(q => q.id === v.teacherSubjectId).profile,
          teacherName: subjects.find(q => q.id === v.teacherSubjectId).teacherName,
          teacherSurname: subjects.find(q => q.id === v.teacherSubjectId).teacherSurname,
        })))
      )),
      catchError(() => of([]))
    );
  }

}
