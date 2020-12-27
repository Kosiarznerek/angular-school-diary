import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ISchedule} from '../../../services/marks/marks.service.models';
import {MarksService} from '../../../services/marks/marks.service';

@Component({
  selector: 'app-marks-subjects',
  templateUrl: './marks-subjects.component.html',
  styleUrls: ['./marks-subjects.component.scss']
})
export class MarksSubjectsComponent implements OnInit {

  public subjects: ISchedule[];

  constructor(
    private readonly router: Router,
    private readonly marksService: MarksService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.subjects = null;

  }

  ngOnInit(): void {
    const classId = +this.activatedRoute.snapshot.params.classId;
    this.marksService.getTeachersSchedules(classId).subscribe(response => {
      this.subjects = response;
    });
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate(['../../classes'], {
      relativeTo: this.activatedRoute,
    });
  }

}
