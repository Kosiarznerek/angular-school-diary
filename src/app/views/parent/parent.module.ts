import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParentRoutingModule} from './parent-routing.module';
import {AppSharedModule} from '../../app.shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppSharedModule,
    ParentRoutingModule,
  ]
})
export class ParentModule {
}
