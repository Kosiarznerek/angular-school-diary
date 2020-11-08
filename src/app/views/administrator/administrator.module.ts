import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorRoutingModule} from './administrator-routing.module';
import {AppMaterialModule} from '../../app.material.module';
import {UsersComponent} from './users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AdministratorRoutingModule,
  ]
})
export class AdministratorModule {
}
