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

const routes: Routes = [
  {path: "register-user", component: RegisterUserComponent},
  {path: "log-in", component: LogInComponent},
  {path: "all-events", component: AllEventsComponent},
  {path: "detail-event", component: DetailsEventComponent},
  {path: "my-events", component: MyEventsComponent},
  {path: "my-purchases", component: MyPurchasesComponent},
  {path: "descargar-factura", component: DescargaFacturaComponent},
  {path: "datos-facturacion", component: DatosFacturacionComponent},
  {path: "edit-profile", component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
