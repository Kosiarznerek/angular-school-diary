import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IAttendance} from '../../../services/attendance/attendance.service.models';
import {AttendanceService} from '../../../services/attendance/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  public attendances: IAttendance[];

  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.attendances = null;
  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.attendanceService.getStudentAttendance(studentId).subscribe(response => {
      this.attendances = response;
    });
  }

}
