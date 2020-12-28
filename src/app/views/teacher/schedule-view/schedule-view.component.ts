import {Component, OnInit} from '@angular/core';
import {ISchedule} from '../../../services/lessons/lessons.service.models';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit {

  public subjects: ISchedule[];

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const classId = +this.activatedRoute.snapshot.params.classId;
    this.lessonsService.getTeachersSchedules(classId).subscribe(response => {
      this.subjects = response;
    });
  }

}
