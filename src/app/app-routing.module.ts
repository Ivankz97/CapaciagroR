import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: "", component: AppComponent},
  {path: "log-in", component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
