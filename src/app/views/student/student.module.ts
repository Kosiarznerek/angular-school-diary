import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {AppSharedModule} from '../../app.shared.module';
import {NotesComponent} from './notes/notes.component';
import {InformationComponent} from './information/information.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {MarksComponent} from './marks/marks.component';

@NgModule({
  declarations: [NotesComponent, InformationComponent, AttendanceComponent, ScheduleComponent, MarksComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
