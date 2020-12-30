import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../../services/evets/events.service';
import {IStudentEvent} from '../../../services/evets/events.service.models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: IStudentEvent[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.events = null;

  }

  ngOnInit(): void {
    const studentId = +this.activatedRoute.parent.snapshot.params.studentId;
    this.eventsService.getStudentEvents(studentId).subscribe(response => {
      this.events = response;
    });
  }

}
