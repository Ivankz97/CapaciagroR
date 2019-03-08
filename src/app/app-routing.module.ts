import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';


const routes: Routes = [
  {path: "register-user", component: RegisterUserComponent},
  {path: "log-in", component: LogInComponent},
  {path: "all-events", component: AllEventsComponent},
  {path: "detail-event", component: DetailsEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
