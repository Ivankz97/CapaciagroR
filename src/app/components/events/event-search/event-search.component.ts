import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from './../../../services/event.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplateRef,Input, Output, EventEmitter, AfterViewChecked, AfterViewInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Uris } from './../../../services/Uris';
import { UserService } from './../../../services/user.service';
@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})

export class EventSearchComponent implements OnInit {
  data: any = [];
  data2: any = [];
  public valformFacturation: FormGroup;
 dataFacturation: any=[];
 user: any;
 evento:any;
 id: any;
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
usuarios: any = []
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
 @ViewChild('showModal') private showModal: any;
 @ViewChild('facturationModal') private facturationModal: any;
 @ViewChild('paymentsModal') private paymentsModal: any;
 
 constructor(private __router: Router, private formBuilder: FormBuilder,private __userService: UserService, private __eventService: EventService, private activatedRoute: ActivatedRoute) {
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
/* ngOnInit() {
   if (localStorage.getItem('currentUser')) {
     this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
   }
   if (this.user.admin) {
     this.__eventService.getOne(
       {
         event: {
           id: this.queryParams
         }
       }
     ).subscribe((data) => {
       console.log("Datos -->", data)
       this.data = data.event
     }, e => {
       console.log(e);
     });
   }
 } */
 ngOnInit() {
  if (localStorage.getItem('currentUser')) {
    this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
  }
  if (this.user.admin) {
    this.__eventService.getOne({
        event: {
          id: this.queryParams
        }
      }).subscribe((data) => {
      console.log("Datos -->", data)
      this.data = data.event
    }, e => {
      console.log(e);
    });
  }
}

public showUser() {
  if (localStorage.getItem('currentUser')) {
    this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
  }

  this.__userService.getAll({
    }).subscribe(data => {
    console.log("DATOS usuarios-->", data)
    this.usuarios = data.suscriptions
  })
}
 
/*public showUser(id) {
  if (localStorage.getItem('currentUser')) {
    this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
  }
  this.__userService.getOne({ users: { id:id} }).subscribe(data => {
    console.log("DATOS In-->", data)
    // let users = []
    // for (let i = 0; i < data.suscriptions.length; i++) {
    //   users.push(data.suscriptions[i].user)
    // }
    this.usuarios = data.user
    //this.showModal.show()
  })
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
 */

}