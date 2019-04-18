import { ConfirmacionInscripcionComponent } from './../../modals/confirmacion-inscripcion/confirmacion-inscripcion.component';
import { Component, TemplateRef, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked, AfterViewInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import { EventService } from './../../../services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uris } from './../../../services/Uris';
import { UserService } from './../../../services/user.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { template, query } from '@angular/core/src/render3';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {
   data: any = [];
   data2: any = [];
   public valformFacturation: FormGroup;
  dataFacturation: any=[];
  user: any;
  evento:any;
  p: any;
  myEvents: any;
  myEvents2: any;
  eventId: any;
  payments: any = [];
  archive: any;
  filter: any;
  prueba: any = '';
  event:any;
  loading: any = false
  ruta: any
  queryParams: any;
  public insForm: FormGroup;
  @Output("onRefresh")
  onRefresh = new EventEmitter<any>();
  @ViewChild('eventModal') private eventModal: any;
  arrayUsers: any = [];
  metodoPago: any
  cupon: any;
  public valForm: FormGroup;
  public arrayFacturation: any = []
  url: string = "http://68.183.18.239/";
  
  @ViewChild('facturationModal') private facturationModal: any;
  @ViewChild('paymentsModal') private paymentsModal: any;
  
  constructor(private __router: Router, private formBuilder: FormBuilder, private __eventService: EventService, private activatedRoute: ActivatedRoute) {
    this.ruta = Uris.API_FILES_ENDPOINT
    this.queryParams = this.activatedRoute.snapshot.params.id
    console.log("queryParams -->", this.queryParams);
    this.ruta = Uris.API_FILES_ENDPOINT
    this.insForm = formBuilder.group({
      "id": [null],
      "numberPeople": [null],
      "name": [null, Validators.compose([Validators.required])],
      "lastname": [null, Validators.compose([Validators.required])],
      "email": [null, Validators.compose([Validators.required])],
      "phone": [null, Validators.compose([Validators.required])],
      "user": [[], Validators.compose([Validators.required])],
      "descripcion": [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
    }
    if (this.user.admin) {
      this.__eventService.eventInscriptions(
        {
          event: {
            id: this.queryParams
          }
        }
      ).subscribe((data) => {
        console.log("Datos -->", data)
        this.data = data.suscriptions
      }, e => {
        console.log(e);
      });
    }
  }
  public paymentsShow(data2) {
    console.log("Data2 -->",data2)
    this.__eventService.eventInscriptions({ event: { id: data2.id } }).subscribe(data => {
      // console.log("DATOS In-->", data)
      // let users = []
      // for (let i = 0; i < data.suscriptions.length; i++) {
      //   users.push(data.suscriptions[i].user)
      // }
      console.log("Datos -->", data)
      console.log("Pagos -->",this.payments)
      for (let i = 0; i < data.suscriptions.length; i++) {
        // this.payments.push(data.inscriptions[0].payment)       
        let rep = 0
        console.log("Primer pago -->", data.suscriptions[i].payment)
        for (let j = 0; j < this.payments.length; j++) {
          if (data.suscriptions[i].payment ? data.suscriptions[i].payment.id : -2 == this.payments[j] ? this.payments[j].id : -1) {
            rep += 1
          }
        }
        if (rep == 0) {
          this.payments.push(data.suscriptions[i].payment)
        }
      }
      console.log("PAGOS UNICOS ->", this.payments)
      this.paymentsModal.show()
    })
    this.eventId = data2.id
    this.event = data2  
  }


  public validate(id) {
    Swal.fire({
      title: 'Seguro que quieres validar este pago?',
      text: "",
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });
    this.ngOnInit();
    this.__eventService.validate({ 
      
      event: { id: this.queryParams },
       payment: { id } 
      }).subscribe(data => {
      console.log("DATOS In-->", data)

     
    
      if (data.result === "true") {
    
        this.__eventService.eventInscriptions({ event: { id: this.queryParams } }).subscribe(data2 => {
          console.log("Datos -->", data)
          if (data2.result == "true") {
            for (let i = 0; i < data2.suscriptions.length; i++) {
              // this.payments.push(data.inscriptions[0].payment)       
              let rep = 0
              console.log("Primer pago -->", data2.suscriptions[0].payment)
              for (let j = 0; j < this.payments.length; j++) {
                if (data2.suscriptions[i].payment ? data2.suscriptions[i].id : -2 == this.payments[j] ? this.payments[j].id : -1) {
                  rep += 1
                }
              }
              if (rep == 0) {
                this.payments.push(data2.suscriptions[i].payment)
              }
            }
            console.log("PAGOS UNICOS ->", this.payments)
            Swal.fire({ type: 'success', title: 'Pago validado', text: '' });
            this.ngOnInit()
            //this.paymentsModal.hide()
          }
        })
      }
    })
  }
  
public facturacion(){
  if (this.user.admin) {
    if (this.user.admin) {
      this.__eventService.myFacturationData(
        {
          event: {
            id: this.queryParams
          }
        }
      ).subscribe((data2) => {
        console.log("Datos -->", data2)
        this.data2 = data2.facturation_data
      }, e => {
        console.log(e);
      });
    }
  }

}
  public delete(event) {
    console.log("EVENT -->", event);
    Swal.fire({
      title: '¿Seguro que deseas eliminar este patronato?',
      type: "warning",
      text: 'Los datos seran eliminados.',

      //dangerMode: true,
    }).then((accepted) => {
      if (accepted) {
        this.__eventService.delete({
          user: {
            id: this.queryParams
          }
        }).subscribe(() => {
          Swal.fire({ type: 'success', title: 'Usuario Eliminado', text: 'El Usuario fue eliminado exitosamenete.' });
          this.ngOnInit()
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: 'Hay problemas para eliminar información, intentalo más tarde.' });
        })
      }
    });
  }


}

