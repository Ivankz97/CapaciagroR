import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { RecovPasswordComponent } from './components/users/recov-password/recov-password.component';

const routes: Routes = [
  {path: "", component: RegisterUserComponent},
  {path: "recov-password", component: RecovPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
