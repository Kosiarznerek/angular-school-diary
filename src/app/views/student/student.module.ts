import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {AppSharedModule} from '../../app.shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppSharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
