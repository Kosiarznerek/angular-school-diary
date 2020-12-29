import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IClassInformation} from '../../../services/classes/classes.service.models';
import {ClassesService} from '../../../services/classes/classes.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public classInformation: IClassInformation;

  constructor(
    private readonly classesService: ClassesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.classInformation = null;
  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.classesService.getStudentClassInformation(studentId).subscribe(response => {
      this.classInformation = response;
    });
  }

}
