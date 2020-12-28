import {Component, OnInit} from '@angular/core';
import {ISchedule} from '../../../services/lessons/lessons.service.models';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonsService} from '../../../services/lessons/lessons.service';

@Component({
  selector: 'app-lessons-subjects',
  templateUrl: './lessons-subjects.component.html',
  styleUrls: ['./lessons-subjects.component.scss']
})
export class LessonsSubjectsComponent implements OnInit {

  public subjects: ISchedule[];

  constructor(
    private readonly router: Router,
    private readonly lessonsService: LessonsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.subjects = null;

  }

  ngOnInit(): void {
    const classId = +this.activatedRoute.snapshot.params.classId;
    this.lessonsService.getTeachersSchedules(classId).subscribe(response => {
      this.subjects = response;
    });
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate(['../../classes'], {
      relativeTo: this.activatedRoute,
    });
  }

}
