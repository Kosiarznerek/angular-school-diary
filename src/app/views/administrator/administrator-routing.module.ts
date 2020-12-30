import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {SubjectsTableComponent} from './subjects-table/subjects-table.component';
import {UsersTableResolver} from './users-table/users-table.resolver';
import {UsersDetailsResolver} from './users-details/users-details.resolver';
import {UsersFormComponent} from './users-form/users-form.component';
import {UsersFormResolver} from './users-form/users-form.resolver';
import {SubjectsFormComponent} from './subjects-form/subjects-form.component';
import {SubjectsFormResolver} from './subjects-form/subjects-form.resolver';
import {ClassesTableComponent} from './classes-table/classes-table.component';
import {ClassesFormComponent} from './classes-form/classes-form.component';
import {ClassesFormResolver} from './classes-form/classes-form.resolver';
import {SchedulesClassesComponent} from './schedules-classes/schedules-classes.component';
import {SchedulesViewComponent} from './schedules-view/schedules-view.component';
import {SchedulesFormComponent} from './schedules-form/schedules-form.component';
import {SchedulesFormResolver} from './schedules-form/schedules-form.resolver';
import {MessagesComponent} from '../messages/messages.component';
import {MessagesSendComponent} from '../messages-send/messages-send.component';
import {MessagesSendResolver} from '../messages-send/messages-send.resolver';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      {
        path: 'subjects', data: {
          hiddenChildren: true,
          displayName: 'Przedmioty',
          description: 'Tutaj możesz definiować listę dostępnych przedmiotów.'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'table'},
          {path: 'table', component: SubjectsTableComponent},
          {
            path: ':id/form', component: SubjectsFormComponent, resolve: {
              data: SubjectsFormResolver
            }
          },
          {path: 'form', component: SubjectsFormComponent},
        ]
      },
      {
        path: 'users', data: {
          hiddenChildren: true,
          displayName: 'Użytkownicy',
          description: 'Tutaj możesz zarządzać kontami użytkowników.'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'table'},
          {
            path: 'table', component: UsersTableComponent, resolve: {
              users: UsersTableResolver,
            }
          },
          {
            path: ':id/details', component: UsersDetailsComponent, resolve: {
              details: UsersDetailsResolver,
            }
          },
          {
            path: ':id/form', component: UsersFormComponent, resolve: {
              data: UsersFormResolver,
            }
          },
          {
            path: 'form', component: UsersFormComponent, resolve: {
              data: UsersFormResolver,
            }
          },
        ]
      },
      {
        path: 'classes', data: {
          hiddenChildren: true,
          displayName: 'Klasy',
          description: 'Tutaj możesz definiować dostępne klasy.'
        },
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'table'},
          {path: 'table', component: ClassesTableComponent},
          {
            path: ':id/form', component: ClassesFormComponent, resolve: {
              data: ClassesFormResolver
            }
          },
          {
            path: 'form', component: ClassesFormComponent, resolve: {
              data: ClassesFormResolver
            }
          },
        ]
      },
      {
        path: 'schedules', data: {
          hiddenChildren: true,
          displayName: 'Plany zajęć',
          description: 'Tutaj możesz definiować plany zajęć dla poszczególnych klas.'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'classes'},
          {path: 'classes', component: SchedulesClassesComponent},
          {
            path: ':classId', children: [
              {path: '', pathMatch: 'full', redirectTo: 'view'},
              {path: 'view', component: SchedulesViewComponent},
              {
                path: ':scheduleId/form', component: SchedulesFormComponent, resolve: {
                  data: SchedulesFormResolver
                }
              },
              {
                path: 'form', component: SchedulesFormComponent, resolve: {
                  data: SchedulesFormResolver
                }
              },
            ]
          },
        ]
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
export class AdministratorRoutingModule {
}
