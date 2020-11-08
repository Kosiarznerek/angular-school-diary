import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {AppMaterialModule} from '../../app.material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    TeacherRoutingModule,
  ]
})
export class TeacherModule {
}
