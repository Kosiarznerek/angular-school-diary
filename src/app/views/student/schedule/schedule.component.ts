import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ISchedule} from '../../../services/schedules/schedules.service.models';
import {SchedulesService} from '../../../services/schedules/schedules.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public schedules: ISchedule[];

  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.schedules = null;

  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.schedulesService.getStudentSchedule(studentId).subscribe(response => {
      this.schedules = response;
    });
  }

  public schedulesForDayOfWeek(dayOfWeek: string): ISchedule[] {
    return this.schedules?.filter(v => v.dayOfWeek === dayOfWeek)
      .sort((a, b) =>
        +a.hourStart.replace(/:/g, '') - +b.hourStart.replace(/:/g, '')
      );
  }

}
