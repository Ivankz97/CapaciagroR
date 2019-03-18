/*
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Components
import { AppComponent } from './app.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
import { EventRegistrationComponent } from './components/events/event-registration/event-registration.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListUserCDComponent } from './components/modals/list-user-c-d/list-user-c-d.component';
import { ModelUserComponent } from './components/modals/model-user/model-user.component';
import { UserActionComponent } from './components/modals/user-action/user-action.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';

import { from } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//services
//import { LoginService } from './services/log-in.service';
//import { AuthenticationService } from './services/auth.service';
//import { Uris } from './services/uris';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './components/log-in/log-in.component';
import { ToasterService } from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent
    /*,
    CodeDescComponent,
    EventRegistrationComponent,
    HomeComponent,
    MenuComponent,
    ListUserCDComponent,
    ModelUserComponent,
    UserActionComponent,
    NewAdminComponent,
    LoginService,
    ListUserComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule
    
  ],
  providers: [/*LoginService*],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//import { RegisterUserComponent } from './components/users/register-user/register-user.component';
//import { LogInComponent } from './components/users/log-in/log-in.component';
//import { NavbarUserComponent } from './components/users/navbar-user/navbar-user.component';
//import { AllEventsComponent } from './components/events/all-events/all-events.component';
//import { DetailsEventComponent } from './components/events/details-event/details-event.component';
//import { MyEventsComponent } from './components/events/my-events/my-events.component';
import { LogInComponent } from './components/user/log-in/log-in.component';
import { NewAdminComponent} from './components/new-admin/new-admin.component';
import { MenuComponent} from './components/menu/menu.component';
import { CodeDescComponent } from './components/code-desc/code-desc/code-desc.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { HomeComponent} from './components/home/home.component';
import { EventRegistrationComponent } from './components/events/event-registration/event-registration.component';
//Sevices
import { UserService } from './services/user.service';
import { ToasterService } from 'angular2-toaster';

import { AuthServiceService } from './services/auth-service.service';
import { from } from 'rxjs';
/*
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
*/

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    NewAdminComponent,
    MenuComponent,
    CodeDescComponent,
    ListUserComponent,
    HomeComponent,
    EventRegistrationComponent
    //RegisterUserComponent,
    //LogInComponent,
    //NavbarUserComponent,
    //AllEventsComponent,
    //DetailsEventComponent,
    //MyEventsComponent,
    //MyPurchasesComponent,
    //ConfirmacionInscripcionComponent,
    //ScomprobantePagoComponent,
    //DfichaPagosLineaComponent,
    //FichaPreinscripcionComponent,
    //DescargaFacturaComponent,
    //DatosFacturacionComponent,
    //EditUserComponent,
    //FinishProfileComponent,
    //VerConfirmacionPreinscripcionComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    //NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService, UserService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }