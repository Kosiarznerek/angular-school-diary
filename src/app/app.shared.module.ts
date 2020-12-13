import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {FormErrorsComponent} from './components/form-errors/form-errors.component';
import {AppMaterialModule} from './app.material.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

const sharedComponents = [
  ConfirmDialogComponent,
  FormErrorsComponent,
];

@NgModule({
  declarations: sharedComponents,
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  exports: [
    ...sharedComponents,
    AppMaterialModule,
  ],
})
export class AppSharedModule {
}
