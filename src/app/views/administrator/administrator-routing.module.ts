import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      // {path: 'users', component: UsersComponent, data: {displayName: 'Użytkownicy'}},
      // {path: 'dashboard', component: DashboardComponent, data: {displayName: 'Dashboard'}},
      // {
      //   path: 'sub-routes', data: {displayName: 'Narzędzia'}, children: [
      //     {path: 'dashboard2', component: DashboardComponent, data: {displayName: 'Testowe'}},
      //     {path: 'users2', component: UsersComponent, data: {displayName: 'Pole'}},
      //   ]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
