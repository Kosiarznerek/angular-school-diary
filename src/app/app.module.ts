import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignInComponent} from './views/sign-in/sign-in.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ParentComponent} from './views/parent/parent.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AppSharedModule} from './app.shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication/authentication.interceptor';
import {MessagesComponent} from './views/messages/messages.component';
import {MessagesSendComponent} from './views/messages-send/messages-send.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NotFoundComponent,
    NavigationComponent,
    ParentComponent,
    DashboardComponent,
    MessagesComponent,
    MessagesSendComponent,
  ],
  imports: [
    AppSharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
