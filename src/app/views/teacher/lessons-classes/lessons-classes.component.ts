import {Component, OnInit} from '@angular/core';
import {IClass} from '../../../services/lessons/lessons.service.models';
import {LessonsService} from '../../../services/lessons/lessons.service';

@Component({
  selector: 'app-lessons-classes',
  templateUrl: './lessons-classes.component.html',
  styleUrls: ['./lessons-classes.component.scss']
})
export class LessonsClassesComponent implements OnInit {

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
