import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IUserListItemDto} from '../../../services/users/users.service.models';
import {UsersService} from '../../../services/users/users.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  public isLoading: boolean;
  public readonly displayedColumns: string[];
  public readonly dataSource: MatTableDataSource<IUserListItemDto>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly usersService: UsersService,
  ) {
    this.isLoading = true;
    this.displayedColumns = [
      'login',
      'accountType',
      'name',
      'surname'
    ];
    this.dataSource = new MatTableDataSource<IUserListItemDto>();
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.isLoading = false;
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
