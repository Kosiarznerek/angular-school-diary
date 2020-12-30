import {Component, OnInit} from '@angular/core';
import {IUserBaseData} from '../../services/users/users.service.models';
import {IMessage} from '../../services/messages/messages.service.models';
import {UsersService} from '../../services/users/users.service';
import {MessagesService} from '../../services/messages/messages.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public users: IUserBaseData[];
  public messages: IMessage[];

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {

    this.messages = null;

  }

  ngOnInit(): void {
    forkJoin([
      this.usersService.getAll({
        student: true,
        parent: true,
        teacher: true,
        administrator: true,
      }),
      this.messagesService.getReceivedMessages(),
    ]).subscribe(([users, messages]) => {
      this.users = users;
      this.messages = messages;
    });
  }

}
