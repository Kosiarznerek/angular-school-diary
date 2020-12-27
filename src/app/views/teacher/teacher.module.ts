import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {AppSharedModule} from '../../app.shared.module';
import {MarksClassesComponent} from './marks-classes/marks-classes.component';
import {MarksSubjectsComponent} from './marks-subjects/marks-subjects.component';
import {MarksViewsComponent} from './marks-views/marks-views.component';
import {MarksFormComponent} from './marks-form/marks-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MarksClassesComponent,
    MarksSubjectsComponent,
    MarksViewsComponent,
    MarksFormComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TeacherModule {
}
