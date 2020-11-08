import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      {
        path: 'users', component: UsersComponent, data: {
          displayName: 'Użytkownicy',
          description: 'Tutaj możesz zarządzać kontami użytkowników.'
        }
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
