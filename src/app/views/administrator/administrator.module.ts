import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorRoutingModule} from './administrator-routing.module';
import {UsersTableComponent} from './users-table/users-table.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {UsersFormComponent} from './users-form/users-form.component';
import {SubjectsAddComponent} from './subjects-add/subjects-add.component';
import {SubjectsTableComponent} from './subjects-table/subjects-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppSharedModule} from '../../app.shared.module';

@NgModule({
  declarations: [
    UsersTableComponent,
    UsersDetailsComponent,
    SubjectsAddComponent,
    SubjectsTableComponent,
    UsersFormComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    AdministratorRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdministratorModule {
}
