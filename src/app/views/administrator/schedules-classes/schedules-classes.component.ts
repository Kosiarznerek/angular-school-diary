import {Component, OnInit} from '@angular/core';
import {IClass} from '../../../services/classes/classes.service.models';
import {ClassesService} from '../../../services/classes/classes.service';

@Component({
  selector: 'app-schedules-classes',
  templateUrl: './schedules-classes.component.html',
  styleUrls: ['./schedules-classes.component.scss']
})
export class SchedulesClassesComponent implements OnInit {

  public classesData: IClass[];

  constructor(
    private readonly classesService: ClassesService,
  ) {

    this.classesData = null;

  }

  ngOnInit(): void {
    this.classesService.getAll().subscribe(response => {
      this.classesData = response;
    });
  }

}
