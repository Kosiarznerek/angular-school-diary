import {Component, OnInit} from '@angular/core';
import {SchedulesService} from '../../../services/schedules/schedules.service';
import {ISchedule} from '../../../services/schedules/schedules.service.models';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.component.html',
  styleUrls: ['./schedules-view.component.scss']
})
export class SchedulesViewComponent implements OnInit {

  public schedules: ISchedule[];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly schedulesService: SchedulesService,
  ) {

    this.schedules = null;

  }

  ngOnInit(): void {
    this.schedulesService.getAll(this.classId).subscribe(response => {
      this.schedules = response;
    });
  }

  public get classId(): number {
    return +this.activatedRoute.snapshot.params.classId;
  }

  public schedulesForDayOfWeek(dayOfWeek: string): ISchedule[] {
    return this.schedules?.filter(v => v.dayOfWeek === dayOfWeek)
      .sort((a, b) =>
        +a.hourStart.replace(/:/g, '') - +b.hourStart.replace(/:/g, '')
      );
  }

  public async onReturnButtonClick(): Promise<void> {
    await this.router.navigate(['../../classes'], {
      relativeTo: this.activatedRoute
    });
  }

  public async onScheduleAddButtonClick(): Promise<void> {
    await this.router.navigate(['../form'], {
      relativeTo: this.activatedRoute
    });
  }

  public async onScheduleEditButtonClick(schedule: ISchedule): Promise<void> {
    await this.router.navigate([`../${schedule.id}/form`], {
      relativeTo: this.activatedRoute
    });
  }

  public async onScheduleRemoveButtonClick(schedule: ISchedule): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć plan ${schedule.subject.name} ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.schedulesService.remove(schedule.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      this.schedulesService.getAll(this.classId).subscribe(response => {
        this.schedules = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
