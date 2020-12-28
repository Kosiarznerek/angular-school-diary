import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {ILesson} from '../../../services/lessons/lessons.service.models';

@Component({
  selector: 'app-lessons-view',
  templateUrl: './lessons-view.component.html',
  styleUrls: ['./lessons-view.component.scss']
})
export class LessonsViewComponent implements OnInit {

  public lessons: ILesson[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly lessonsService: LessonsService,
  ) {

    this.lessons = null;

  }

  ngOnInit(): void {
    const scheduleId = +this.activatedRoute.snapshot.params.scheduleId;
    this.lessonsService.getAll(scheduleId).subscribe(response => {
      this.lessons = response;
    });
  }

}
