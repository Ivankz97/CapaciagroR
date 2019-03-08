import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { NavbarUserComponent } from './components/users/navbar-user/navbar-user.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
    NavbarUserComponent,
    AllEventsComponent,
    DetailsEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
