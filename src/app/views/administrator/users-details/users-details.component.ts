import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IUserDetailsData} from '../../../services/users/users.service.models';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  public details: IUserDetailsData;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.details = this.activatedRoute.snapshot.data.details;
  }

  public async onBackClickHandler(): Promise<void> {
    await this.router.navigate(['../../table'], {
      relativeTo: this.activatedRoute,
    });
  }

}
