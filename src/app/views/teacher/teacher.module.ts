import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {AppSharedModule} from '../../app.shared.module';
import {MarksClassesComponent} from './marks-classes/marks-classes.component';
import {MarksSubjectsComponent} from './marks-subjects/marks-subjects.component';
import {MarksViewsComponent} from './marks-views/marks-views.component';
import {MarksFormComponent} from './marks-form/marks-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LessonsClassesComponent} from './lessons-classes/lessons-classes.component';
import {LessonsSubjectsComponent} from './lessons-subjects/lessons-subjects.component';
import {LessonsViewComponent} from './lessons-view/lessons-view.component';
import {LessonsDetailsComponent} from './lessons-details/lessons-details.component';
import {LessonsFormComponent} from './lessons-form/lessons-form.component';
import {NotesViewComponent} from './notes-view/notes-view.component';
import {NotesFormComponent} from './notes-form/notes-form.component';
import {StudentsViewComponent} from './students-view/students-view.component';
import {StudentsDetailsComponent} from './students-details/students-details.component';
import {ScheduleClassesComponent} from './schedule-classes/schedule-classes.component';
import {ScheduleViewComponent} from './schedule-view/schedule-view.component';
import {EventsViewComponent} from './events-view/events-view.component';
import {EventsFormComponent} from './events-form/events-form.component';

@NgModule({
  declarations: [
    MarksClassesComponent,
    MarksSubjectsComponent,
    MarksViewsComponent,
    MarksFormComponent,
    LessonsClassesComponent,
    LessonsSubjectsComponent,
    LessonsViewComponent,
    LessonsDetailsComponent,
    LessonsFormComponent,
    NotesViewComponent,
    NotesFormComponent,
    StudentsViewComponent,
    StudentsDetailsComponent,
    ScheduleClassesComponent,
    ScheduleViewComponent,
    EventsViewComponent,
    EventsFormComponent,
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
