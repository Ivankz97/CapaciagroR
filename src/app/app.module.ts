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
import { MyEventsComponent } from './components/events/my-events/my-events.component';
import { MyPurchasesComponent } from './components/users/my-purchases/my-purchases.component';
import { ConfirmacionInscripcionComponent } from './components/modals/confirmacion-inscripcion/confirmacion-inscripcion.component';
import { ScomprobantePagoComponent } from './components/modals/scomprobante-pago/scomprobante-pago.component';
import { DfichaPagosLineaComponent } from './components/modals/dficha-pagos-linea/dficha-pagos-linea.component';
import { FichaPreinscripcionComponent } from './components/events/ficha-preinscripcion/ficha-preinscripcion.component';
import { DescargaFacturaComponent } from './components/modals/descarga-factura/descarga-factura.component';
import { DatosFacturacionComponent } from './components/datos-facturacion/datos-facturacion.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { FinishProfileComponent } from './components/modals/finish-profile/finish-profile.component';
import { VerConfirmacionPreinscripcionComponent } from './components/modals/ver-confirmacion-preinscripcion/ver-confirmacion-preinscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
    NavbarUserComponent,
    AllEventsComponent,
    DetailsEventComponent,
    MyEventsComponent,
    MyPurchasesComponent,
    ConfirmacionInscripcionComponent,
    ScomprobantePagoComponent,
    DfichaPagosLineaComponent,
    FichaPreinscripcionComponent,
    DescargaFacturaComponent,
    DatosFacturacionComponent,
    EditUserComponent,
    FinishProfileComponent,
    VerConfirmacionPreinscripcionComponent
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
