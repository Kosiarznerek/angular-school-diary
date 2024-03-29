import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorRoutingModule} from './administrator-routing.module';
import {UsersTableComponent} from './users-table/users-table.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {UsersFormComponent} from './users-form/users-form.component';
import {SubjectsTableComponent} from './subjects-table/subjects-table.component';
import {SubjectsFormComponent} from './subjects-form/subjects-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppSharedModule} from '../../app.shared.module';
import {ClassesTableComponent} from './classes-table/classes-table.component';
import {ClassesFormComponent} from './classes-form/classes-form.component';
import {SchedulesClassesComponent} from './schedules-classes/schedules-classes.component';
import {SchedulesViewComponent} from './schedules-view/schedules-view.component';
import {SchedulesFormComponent} from './schedules-form/schedules-form.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    UsersDetailsComponent,
    SubjectsTableComponent,
    SubjectsFormComponent,
    UsersFormComponent,
    ClassesTableComponent,
    ClassesFormComponent,
    SchedulesClassesComponent,
    SchedulesViewComponent,
    SchedulesFormComponent,
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
