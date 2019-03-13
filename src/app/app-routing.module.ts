import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { NewAdminComponent } from './../../src/app/components/new-admin/new-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppComponent } from './app.component';
import { CodeDescComponent  } from './components/code-desc/code-desc/code-desc.component';;
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { HomeComponent } from './components/home/home.component';
import {EventRegistrationComponent} from './components/events/event-registration/event-registration.component';
const routes: Routes = [
  { path:"", component: AppComponent },
  { path:"menu/", component: MenuComponent },
  { path:"Lista-usuarios/", component: ListUserComponent },
  { path:"event/registration", component: EventRegistrationComponent },
  { path:"home/", component: HomeComponent },
  { path:"user/Log-in/", component: CodeDescComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
