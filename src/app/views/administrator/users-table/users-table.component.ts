import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IUserBaseData} from '../../../services/users/users.service.models';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../services/users/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  public readonly displayedColumns: string[];
  public expandedElement: IUserBaseData | null;
  public readonly dataSource: MatTableDataSource<IUserBaseData>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
  ) {
    this.displayedColumns = [
      'login',
      'accountType',
      'name',
      'surname'
    ];
    this.dataSource = new MatTableDataSource<IUserBaseData>();
  }

  ngOnInit(): void {
    this.dataSource.data = this.activatedRoute.snapshot.data.users;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public async onAddClickHandler(): Promise<void> {
    await this.router.navigate([`../form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onDetailsClickHandler(): Promise<void> {
    const {id} = this.expandedElement;
    await this.router.navigate([`../${id}/details`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onEditClickHandler(): Promise<void> {
    const {id} = this.expandedElement;
    await this.router.navigate([`../${id}/form`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onDeleteClickHandler(): Promise<void> {
    const {name, surname, id} = this.expandedElement;
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Usunięcie elementu',
        content: `Czy na pewno usunąć użytkownika ${name} ${surname} ?`,
      }
    });
    const actionConfirmed: boolean = await dialogRef.afterClosed().toPromise();

    if (!actionConfirmed) {
      this.matSnackBar.open('Anulowano usuwanie');
      return;
    }

    this.matSnackBar.open('Trwa usuwanie użytkownika');
    const isSuccess = await this.usersService.delete(id).toPromise();
    if (!isSuccess) {
      this.matSnackBar.open('Coś poszło nie tak');
      return;
    }

    this.matSnackBar.open('Usunięto poprawnie');
    this.dataSource.data = this.dataSource.data.filter(v => v.id !== id);
  }

}
