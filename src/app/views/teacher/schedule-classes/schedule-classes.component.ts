import {Component, OnInit} from '@angular/core';
import {IClass} from '../../../services/lessons/lessons.service.models';
import {LessonsService} from '../../../services/lessons/lessons.service';

@Component({
  selector: 'app-schedule-classes',
  templateUrl: './schedule-classes.component.html',
  styleUrls: ['./schedule-classes.component.scss']
})
export class ScheduleClassesComponent implements OnInit {

  public teacherClasses: IClass[];

  constructor(
    private readonly lessonsService: LessonsService,
  ) {
  }

  ngOnInit(): void {
    this.lessonsService.getTeachersClasses().subscribe(response => {
      this.teacherClasses = response;
    });
  }

}
