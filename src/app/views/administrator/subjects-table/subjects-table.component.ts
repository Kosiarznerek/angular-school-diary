import {Component, OnInit} from '@angular/core';
import {SubjectsService} from '../../../services/subjects/subjects.service';
import {ISubject} from '../../../services/subjects/subjects.service.models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {

  public subjects: ISubject[];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subjectsService: SubjectsService,
  ) {

    this.subjects = null;

  }

  ngOnInit(): void {
    this.subjectsService.getAll().subscribe(response => {
      this.subjects = response;
    });
  }

  public async onSubjectAddButtonClick(): Promise<void> {
    await this.router.navigate(['../form'], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onSubjectEditButtonClick(subject: ISubject): Promise<void> {
    await this.router.navigate([`../${subject.id}/form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onSubjectRemoveButtonClick(subject: ISubject): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć przedmiot ${subject.name} ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.subjectsService.remove(subject.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      this.subjectsService.getAll().subscribe(response => {
        this.subjects = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
