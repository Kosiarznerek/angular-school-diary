import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {AppSharedModule} from '../../app.shared.module';
import {NotesComponent} from './notes/notes.component';

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
