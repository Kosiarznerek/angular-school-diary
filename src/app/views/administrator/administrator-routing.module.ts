import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {UsersAddComponent} from './users-add/users-add.component';
import {SubjectsTableComponent} from './subjects-table/subjects-table.component';
import {SubjectsAddComponent} from './subjects-add/subjects-add.component';

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
          {path: 'table', component: UsersTableComponent},
          {path: ':id/details', component: UsersDetailsComponent},
          {path: 'add', component: UsersAddComponent},
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
          {path: 'add', component: SubjectsAddComponent},
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
