import {Component, OnInit} from '@angular/core';
import {ILesson} from '../../../services/lessons/lessons.service.models';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lessons-details',
  templateUrl: './lessons-details.component.html',
  styleUrls: ['./lessons-details.component.scss']
})
export class LessonsDetailsComponent implements OnInit {

  public details: ILesson;

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.details = null;
  }

  ngOnInit(): void {
    const lessonId = +this.activatedRoute.snapshot.params.lessonId;
    this.lessonsService.getOne(lessonId).subscribe(response => {
      this.details = response;
    });
  }

}
