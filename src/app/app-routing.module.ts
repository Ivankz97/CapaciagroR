import { ConfirmacionInscripcionComponent } from './components/modals/confirmacion-inscripcion/confirmacion-inscripcion.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
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
import { Page404Component } from './components/page404/page404.component';
import {  UserActionComponent  } from './components/modals/user-action/user-action.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';

const routes: Routes = [
  //{path: "**", redirectTo: "log-in"},
  {path: "", component: LogInComponent},
  {path: "register-user", component: RegisterUserComponent},
  {path: "log-in", component: LogInComponent},
  {path: "all-events", component: AllEventsComponent},
  {path: "codigo-descuento",component:CodeDescComponent},
  {path: "detail-event/:id", component: DetailsEventComponent},
  {path: "my-events", component: MyEventsComponent},
  //{path: "nuevoAdministrador", component:}
  {path: "modalInscripcion/:id", component: ConfirmacionInscripcionComponent},
  {path: "ListaUsuarios",component:ListUserComponent},
  {path: "eventos", component: EventRegistrationComponent },
  {path: "accionde_usuario/:id", component: UserActionComponent},
  {path: "my-purchases", component: MyPurchasesComponent},
  {path: "descargar-factura", component: DescargaFacturaComponent},
  {path: "datos-facturacion", component: DatosFacturacionComponent},
  {path: "edit-profile", component: EditUserComponent},
  {path: "nuevoadministrador", component: NewAdminComponent},
  {path: "**", component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
