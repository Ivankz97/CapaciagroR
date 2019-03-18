import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAdminComponent } from './../../src/app/components/new-admin/new-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { CodeDescComponent  } from './components/code-desc/code-desc/code-desc.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { HomeComponent } from './components/home/home.component';
import {EventRegistrationComponent} from './components/events/event-registration/event-registration.component';
import { LogInComponent } from './components/user/log-in/log-in.component';
const routes: Routes = [
  { path: "new/user", component:NewAdminComponent},
  { path:"menu", component: MenuComponent },
  { path: "code-descuento", component: CodeDescComponent},
  { path:"Lista-usuarios", component: ListUserComponent },
  { path:"home", component: HomeComponent },
  { path:"event/registration", component: EventRegistrationComponent },
  { path: "log-in", component: LogInComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
