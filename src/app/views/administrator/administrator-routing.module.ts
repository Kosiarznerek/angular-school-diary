import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
