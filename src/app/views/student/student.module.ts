import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {AppSharedModule} from '../../app.shared.module';
import {NotesComponent} from './notes/notes.component';
import {InformationComponent} from './information/information.component';

@NgModule({
  declarations: [NotesComponent, InformationComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
