import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {AppSharedModule} from '../../app.shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppSharedModule,
    TeacherRoutingModule,
  ]
})
export class TeacherModule {
}
