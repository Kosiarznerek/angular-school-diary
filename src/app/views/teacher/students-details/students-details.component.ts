import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService} from '../../../services/students/students.service';
import {IStudent} from '../../../services/students/students.service.models';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {

  public details: IStudent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly studentsService: StudentsService,
  ) {

    this.details = null;

  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.snapshot.params.studentId;
    this.studentsService.getOne(studentId).subscribe(response => {
      this.details = response;
    });
  }

}
