import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParentRoutingModule} from './parent-routing.module';
import {AppMaterialModule} from '../../app.material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    ParentRoutingModule,
  ]
})
export class ParentModule {
}
