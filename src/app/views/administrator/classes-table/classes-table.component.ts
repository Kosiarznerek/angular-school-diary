import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../../services/classes/classes.service';
import {IClass} from '../../../services/classes/classes.service.models';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit {

  public classesData: IClass[];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly classesService: ClassesService,
  ) {

    this.classesData = null;

  }

  ngOnInit(): void {
    this.classesService.getAll().subscribe(response => {
      this.classesData = response;
    });
  }

  public async onAddNewClassButtonClick(): Promise<void> {
    await this.router.navigate(['../form'], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onEditClassButtonClick(classModel: IClass): Promise<void> {
    await this.router.navigate([`../${classModel.id}/form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onRemoveClassButtonClick(classModel: IClass): Promise<void> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć klasę ${classModel.year}${classModel.symbol} ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();
    if (!actionConfirmed) {
      return;
    }

    const isSuccess = await this.classesService.remove(classModel.id).toPromise();
    if (isSuccess) {
      this.matSnackBar.open('Usunięto poprawnie');
      this.classesService.getAll().subscribe(response => {
        this.classesData = response;
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
