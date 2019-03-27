import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { DatosFacturacionComponent } from './components/datos-facturacion/datos-facturacion.component';
import { DescargaFacturaComponent } from './components/modals/descarga-factura/descarga-factura.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';
import { MyEventsComponent } from './components/events/my-events/my-events.component';
import { MyPurchasesComponent } from './components/users/my-purchases/my-purchases.component';
import {EventRegistrationComponent} from './components/events/event-registration/event-registration.component';
import {  NewAdminComponent } from '../app/components/new-admin/new-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { from } from 'rxjs';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

 
const routes: Routes = [
  
  //{path: "**", redirectTo: "", component: LogInComponent},
  {path: "", component: LogInComponent},
  {path: "register-user", component: RegisterUserComponent},
  {path: "codigo-descuento", component: CodeDescComponent},
  {path: "log-in",pathMatch:'full', component: LogInComponent},
  {path: "all-events",pathMatch: 'full' , component: AllEventsComponent},
  {path: "detail-event", component: DetailsEventComponent},
  {path: "my-events", component: MyEventsComponent},
  {path: "eventos", component: EventRegistrationComponent },
  {path: "my-purchases", component: MyPurchasesComponent},
  {path: "descargar-factura", component: DescargaFacturaComponent},
  {path: "datos-facturacion", component: DatosFacturacionComponent},
  {path: "edit-profile", component: EditUserComponent},
  {path: "nuevoadministrador", component: NewAdminComponent},
  {path: "menu", component: MenuComponent},
  {path:"ListaUsuarios",component:ListUserComponent}, 
  {path: "registrar-evento", component:EventRegistrationComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
