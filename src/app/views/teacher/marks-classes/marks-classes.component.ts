import {Component, OnInit} from '@angular/core';
import {IClass} from '../../../services/marks/marks.service.models';
import {MarksService} from '../../../services/marks/marks.service';

@Component({
  selector: 'app-marks-classes',
  templateUrl: './marks-classes.component.html',
  styleUrls: ['./marks-classes.component.scss']
})
export class MarksClassesComponent implements OnInit {

  public teacherClasses: IClass[];

  constructor(
    private readonly marksService: MarksService,
  ) {

    this.teacherClasses = null;

  }

  ngOnInit(): void {
    this.marksService.getTeachersClasses().subscribe(response => {
      this.teacherClasses = response;
    });
  }

}
