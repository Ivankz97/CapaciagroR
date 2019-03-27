import { ExcelService } from './services/ExportExcel';
import { EventService } from './services/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { NavbarUserComponent } from './components/users/navbar-user/navbar-user.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';
import { MyEventsComponent } from './components/events/my-events/my-events.component';
import { UserService } from './services/user.service';
import { ToasterService } from 'angular2-toaster';
import { MyPurchasesComponent } from './components/users/my-purchases/my-purchases.component';
import { AuthenticationService } from './services/auth.service';
import { ConfirmacionInscripcionComponent } from './components/modals/confirmacion-inscripcion/confirmacion-inscripcion.component';
import { ScomprobantePagoComponent } from './components/modals/scomprobante-pago/scomprobante-pago.component';
import { DfichaPagosLineaComponent } from './components/modals/dficha-pagos-linea/dficha-pagos-linea.component';
import { FichaPreinscripcionComponent } from './components/events/ficha-preinscripcion/ficha-preinscripcion.component';
import { DescargaFacturaComponent } from './components/modals/descarga-factura/descarga-factura.component';
import { DatosFacturacionComponent } from './components/datos-facturacion/datos-facturacion.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { FinishProfileComponent } from './components/modals/finish-profile/finish-profile.component';
import { VerConfirmacionPreinscripcionComponent } from './components/modals/ver-confirmacion-preinscripcion/ver-confirmacion-preinscripcion.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
import { EventRegistrationComponent } from './components/events/event-registration/event-registration.component';
import { MenuComponent } from './components/menu/menu.component';
import { Page404Component } from './components/page404/page404.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarritoComponent } from './components/modals/carrito/carrito.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';

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
    VerConfirmacionPreinscripcionComponent,
    CodeDescComponent,
    EventRegistrationComponent,
    MenuComponent,
    Page404Component,
    CarritoComponent,
    ListUserComponent,
    NewAdminComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    ModalModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, PositioningService, ComponentLoaderFactory, BsModalRef, BsModalService, AuthenticationService, UserService, EventService, ToasterService, ExcelService],
  bootstrap: [AppComponent],
  entryComponents:[AllEventsComponent]
})
export class AppModule { }
