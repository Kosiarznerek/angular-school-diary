import {Component, OnInit} from '@angular/core';
import {IEvent} from '../../../services/evets/events.service.models';
import {LessonsService} from '../../../services/lessons/lessons.service';
import {EventsService} from '../../../services/evets/events.service';
import {forkJoin} from 'rxjs';
import {IClass} from '../../../services/lessons/lessons.service.models';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit {

  public events: IEvent[];
  public classes: IClass[];

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly eventsService: EventsService,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
  ) {

    this.events = null;

  }

  ngOnInit(): void {
    forkJoin([
      this.lessonsService.getTeachersClasses(),
      this.eventsService.getTeachersEvents(),
    ]).subscribe(([classes, events]) => {
      this.classes = classes;
      this.events = events;
    });
  }

  public async onEventRemoveButtonClick(event: IEvent): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć wydarzenie ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.eventsService.remove(event.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      this.eventsService.getTeachersEvents().subscribe(response => {
        this.events = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
