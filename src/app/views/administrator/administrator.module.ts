import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorRoutingModule} from './administrator-routing.module';
import {AppMaterialModule} from '../../app.material.module';
import {UsersTableComponent} from './users-table/users-table.component';
import {UsersAddComponent} from './users-add/users-add.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {SubjectsAddComponent} from './subjects-add/subjects-add.component';
import {SubjectsTableComponent} from './subjects-table/subjects-table.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    UsersAddComponent,
    UsersDetailsComponent,
    SubjectsAddComponent,
    SubjectsTableComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AdministratorRoutingModule,
  ]
})
export class AdministratorModule {
}
