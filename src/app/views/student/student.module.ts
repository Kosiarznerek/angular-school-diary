import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {AppMaterialModule} from '../../app.material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
