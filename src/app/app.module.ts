import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignInComponent} from './views/sign-in/sign-in.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {AppMaterialModule} from './app.material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormErrorsComponent} from './components/form-errors/form-errors.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NotFoundComponent,
    FormErrorsComponent,
    NavigationComponent,
    DashboardComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
