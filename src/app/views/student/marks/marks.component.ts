import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarksService} from '../../../services/marks/marks.service';
import {ISubjectMark} from '../../../services/marks/marks.service.models';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  public marks: ISubjectMark[];

  constructor(
    private readonly marksService: MarksService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.marks = null;

  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.marksService.getStudentSubjectMarks(studentId).subscribe(response => {
      this.marks = response;
    });
  }

}
