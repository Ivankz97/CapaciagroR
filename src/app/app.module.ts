import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { PAdminComponent } from './p-admin/p-admin.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { LogInComponent } from './components/user/log-in/log-in.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { EventRegistrationComponent } from './components/events/event-registration/event-registration.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
import { ListUserCDComponent } from './components/modals/list-user-c-d/list-user-c-d.component';
import { ModelUserComponent } from './components/modals/model-user/model-user.component';
import { UserActionComponent } from './components/modals/user-action/user-action.component';

@NgModule({
  declarations: [
    AppComponent,
    //PAdminComponent,
    HomeComponent,
    MenuComponent,
    NewAdminComponent,
    LogInComponent,
    ListUserComponent,
    EventRegistrationComponent,
    CodeDescComponent,
    ListUserCDComponent,
    ModelUserComponent,
    UserActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
