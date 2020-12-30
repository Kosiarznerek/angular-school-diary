import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {NotesComponent} from './notes/notes.component';
import {InformationComponent} from './information/information.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {MarksComponent} from './marks/marks.component';
import {EventsComponent} from './events/events.component';
import {MessagesComponent} from '../messages/messages.component';
import {MessagesSendComponent} from '../messages-send/messages-send.component';
import {MessagesSendResolver} from '../messages-send/messages-send.resolver';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      {
        path: 'notes', component: NotesComponent, data: {
          displayName: 'Uwagi',
          description: 'Tutaj znajdują się uwagi studenta'
        }
      },
      {
        path: 'information', component: InformationComponent, data: {
          displayName: 'Informacje o klasie',
          description: 'Tutaj znajdują się informacje o klasie studenta'
        }
      },
      {
        path: 'attendance', component: AttendanceComponent, data: {
          displayName: 'Frekwencja',
          description: 'Tutaj znajdują się frekwencja studenta'
        }
      },
      {
        path: 'schedule', component: ScheduleComponent, data: {
          displayName: 'Plan zajęć',
          description: 'Tutaj znajdują się plan zajęć studenta'
        }
      },
      {
        path: 'marks', component: MarksComponent, data: {
          displayName: 'Oceny',
          description: 'Tutaj znajdują się oceny studenta'
        }
      },
      {
        path: 'events', component: EventsComponent, data: {
          displayName: 'Wydarzenia',
          description: 'Tutaj znajdują się wydarzenia klasy studenta'
        }
      },
      {
        path: 'messages', data: {
          hiddenChildren: true,
          displayName: 'Komunikator',
          description: 'Tutaj znajdują się twoje wiadomości'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'view'},
          {path: 'view', component: MessagesComponent},
          {
            path: 'send', component: MessagesSendComponent, resolve: {
              data: MessagesSendResolver,
            }
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
