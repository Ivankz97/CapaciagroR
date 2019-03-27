import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uris } from '../../../services/Uris';
import { EventService } from '../../../services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  data: any = [];
  user: any;
  p: any;
  filter: any;
  prueba: any = ''
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
  url : string = "http://68.183.18.239/";

  constructor(private __router: Router, private formBuilder: FormBuilder, private __eventService: EventService, private activatedRoute: ActivatedRoute) {
    this.ruta = Uris.API_FILES_ENDPOINT
    this.queryParams = this.activatedRoute.snapshot.params.id
    console.log("queryParams -->",this.queryParams);
    this.ruta = Uris.API_FILES_ENDPOINT
    this.insForm = formBuilder.group({
      "id": [null],
      "numberPeople": [null],
      "name": [null, Validators.compose([Validators.required])],
      "lastname":[null, Validators.compose([Validators.required])],
      "email": [null, Validators.compose([Validators.required])],
      "phone":[null, Validators.compose([Validators.required])],
      "user": [[], Validators.compose([Validators.required])],
      "descripcion": [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.prueba = 'lorem ipsuasdlj ljlkajdlsj dasudlajsakldjasldjasdjasldjaslkdja lasjdlkasjdaksj dlaksjdalk jdkdjasldjaslkaj lkasj jlkadasjklasjdkl jlkasjdlk aasdl jaslk asjdklasjdlkasjkas alsdj aldjasl djasldalsdlaks '
    if (localStorage.getItem('currentUser')) {
      this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
    }
    if (!this.user.admin) {
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
  }
  


  public insFormSave($ev: any) {
    $ev.preventDefault();
    for (let c in this.insForm.controls) {
      this.insForm.controls[c].markAsTouched();
    }
    if (this.insForm.valid) {
      this.loading = true;
      console.log("Form -->", this.insForm.value);
      this.__eventService.create({
        user: this.insForm.value
      }).subscribe((data) => {
        console.log("Datos al guardar -->", data);
        if (data.result == "true") {
          Swal.fire({ type: 'success', title: 'Usuario Guardado', text: 'El usuario fue creado exitosamenete.' });
        } else {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: data.message[0] });
          this.loading = false;
        }
        this.ngOnInit()
        this.loading = false;
      }, e => {
        Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
        this.loading = false;
      });
    }
  }
  public cancelar() {

  }
  public cleanForm() {
    this.arrayUsers = []
    this.insForm.reset();
  }
  public saveSuscription(id) {
    console.log("Usuarios -->", this.arrayUsers);
    console.log("metodo de pago -->", this.metodoPago);
    this.__eventService.bulkRegister({
      users: this.arrayUsers,
      event: { id: id },
      payment_method: this.metodoPago,
      coupon: {
        name: this.cupon
      },
    }).subscribe((data) => {
      console.log("Datos al guardar -->", data);
      if (data.result === "true") {
        Swal.fire({ type: 'success', title: 'Registrado', text: 'Espera un correo con la ficha de pago' });
        //this.eventModal.hide()
        //location.replace("#/all-events");
        if (this.metodoPago == "paypal") {
          this.__router.navigate([`checkoutEvent/${id}`]);
        } else {
          this.arrayUsers = [],
            this.metodoPago = null
          this.cupon = null
        }
      } else {
        Swal.fire({ type: 'warning', title: 'Conflictos Al Guardar', text: data.message });
        this.loading = false;
      }
      this.loading = false;
    }, e => {
      Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
      this.loading = false;
    });
  }
  public valuechangeName(event, index) {
    console.log("EventoName -->", event.srcElement.value);
    this.arrayUsers[index].name = event.srcElement.value

  }
  public valuechangeEmail(event, index) {
    console.log("EventoEmail -->", event.srcElement.value);
    this.arrayUsers[index].email = event.srcElement.value
  }

  public valuechangeLastname(event, index) {
    console.log("EventoLastname -->", event.srcElement.value);
    this.arrayUsers[index].lastname = event.srcElement.value
  }

  public valuechangePhone(event, index) {
    console.log("EventoPhone -->", event.srcElement.value);
    this.arrayUsers[index].phone = event.srcElement.value
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  public confirmPersons() {
    console.log('confirm');
    this.arrayUsers = [];
    for (let i = 0; i < this.insForm.value.numberPeople; i++) {
      let example = { email: 'e' + i, name: 'n' + i }
      this.arrayUsers.push(example);
    }
  }

}
