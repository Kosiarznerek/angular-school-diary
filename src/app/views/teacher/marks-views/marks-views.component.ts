import {Component, OnInit} from '@angular/core';
import {IMark} from '../../../services/marks/marks.service.models';
import {MarksService} from '../../../services/marks/marks.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-marks-views',
  templateUrl: './marks-views.component.html',
  styleUrls: ['./marks-views.component.scss']
})
export class MarksViewsComponent implements OnInit {

  public marks: IMark[];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly marksService: MarksService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.marks = null;

  }

  ngOnInit(): void {
    const scheduleId = +this.activatedRoute.snapshot.params.scheduleId;
    this.marksService.getTeachersMarks(scheduleId).subscribe(response => {
      this.marks = response;
    });
  }

  public async onMarkEditButtonClick(student: IMark, mark: IMark['marks'][0]): Promise<void> {
    await this.router.navigate([`./${student.studentId}/${mark.id}/form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onMarkAddButtonClick(student: IMark): Promise<void> {
    await this.router.navigate([`./${student.studentId}/form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onMarkRemoveButtonClick(mark: IMark['marks'][0]): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć ocenę ${mark.mark} ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.marksService.remove(mark.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      const scheduleId = +this.activatedRoute.snapshot.params.scheduleId;
      this.marksService.getTeachersMarks(scheduleId).subscribe(response => {
        this.marks = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
