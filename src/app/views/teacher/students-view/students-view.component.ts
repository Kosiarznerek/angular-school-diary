import {Component, OnInit} from '@angular/core';
import {IStudent} from '../../../services/students/students.service.models';
import {StudentsService} from '../../../services/students/students.service';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss']
})
export class StudentsViewComponent implements OnInit {

  public students: IStudent[];

  constructor(
    private readonly studentsService: StudentsService,
  ) {

    this.students = null;

  }

  ngOnInit(): void {
    this.studentsService.getAll().subscribe(response => {
      this.students = response;
    });
  }

}
