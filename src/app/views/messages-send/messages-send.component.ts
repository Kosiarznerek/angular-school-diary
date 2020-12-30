import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUserBaseData} from '../../services/users/users.service.models';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MessagesService} from '../../services/messages/messages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IMessage} from '../../services/messages/messages.service.models';

@Component({
  selector: 'app-messages-send',
  templateUrl: './messages-send.component.html',
  styleUrls: ['./messages-send.component.scss']
})
export class MessagesSendComponent implements OnInit, OnDestroy {

  private readonly users: IUserBaseData[];
  public readonly messageForm: FormGroup;

  public readonly usersFilterControl: FormControl;
  public readonly filteredUsers: ReplaySubject<IUserBaseData[]>;

  private readonly onDestroy: Subject<void>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messagesService: MessagesService,
    private readonly matSnackBar: MatSnackBar,
  ) {

    this.onDestroy = new Subject();

    this.users = this.activatedRoute.snapshot.data.data;
    this.messageForm = this.formBuilder.group({
      userId: [null, Validators.required],
      topic: [null, Validators.required],
      content: [null, Validators.required],
    });

    this.usersFilterControl = new FormControl();
    this.filteredUsers = new ReplaySubject<IUserBaseData[]>(1);
    this.filteredUsers.next(this.users.slice());
    this.usersFilterControl.valueChanges.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => this.filterUsers());

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private filterUsers(): void {
    let search = this.usersFilterControl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUsers.next(
      this.users.filter(({name, surname}) => `${name} ${surname}`.toLowerCase().indexOf(search) > -1)
    );
  }

  public async onMessageSendButtonClick(): Promise<void> {

    const message: IMessage = this.messageForm.getRawValue();
    const isSuccess = await this.messagesService.sendMessage(message).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Wysłano wiadomość poprawnie');
      await this.router.navigate(['../view'], {
        relativeTo: this.activatedRoute
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }

  }

}
