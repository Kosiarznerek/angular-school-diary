import {Component, OnInit} from '@angular/core';
import {ParentService} from '../../services/parent/parent.service';
import {IParentChild} from '../../services/parent/parent.service.models';
import {SignInService} from '../../services/sign-in/sign-in.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public children: IParentChild[];

  constructor(
    private readonly router: Router,
    private readonly signInService: SignInService,
    private readonly parentService: ParentService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.children = null;
  }

  ngOnInit(): void {
    this.parentService.getParentChildren().subscribe(response => {
      this.children = response;
    });
  }

  public async onSignOnButtonClick(): Promise<void> {
    this.signInService.singOut();
    await this.router.navigate(['/']);
  }

}
