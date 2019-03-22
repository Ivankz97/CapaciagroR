import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked, AfterViewInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import { EventService } from './../../../services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uris } from './../../../services/Uris';
import { UserService } from './../../../services/user.service';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  data: any = [];
  user: any;
  p: any;
  filter: any;
  prueba: any = ''
  loading: any = false
  ruta: any;
  arrayUsers: any = [];
  metodoPago: any
  cupon: any;
  public insForm: FormGroup;
  @Output("onRefresh")
  onRefresh = new EventEmitter<any>();
  @ViewChild('eventModal')
  eventModal: any;
  @ViewChild('noCompleteProfile')
  noCompleteProfile: any;
  url : string = "http://68.183.18.239/";

  cellphone: any;
  gender: any;
  study_level: any;
  job: any;
  company: any;

  ngOnInit() {
    this.prueba = 'lorem ipsuasdlj ljlkajdlsj dasudlajsakldjasldjasdjasldjaslkdja lasjdlkasjdaksj dlaksjdalk jdkdjasldjaslkaj lkasj jlkadasjklasjdkl jlkasjdlk aasdl jaslk asjdklasjdlkasjkas alsdj aldjasl djasldalsdlaks '
    if (localStorage.getItem('currentUser')) {
      this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
      console.log("Usuarios -->", this.user)
    }
    if (!this.user.admin) {
      this.__eventService.getAll({}).subscribe((data) => {
        console.log("Datos -->", data)
        this.data = data.events;
      }, e => {
        console.log(e);
      });
    }
  }
  /*ngAfterViewInit() {
    setTimeout(() => {
      if (this.user.cellphone === null || this.user.company === null || this.user.gender === null || this.user.job === null || this.user.study_level === null) {
        this.noCompleteProfile.show()
      }
    }, 1000);
  }*/
  // constructor(public colors: ColorsService, private __chartService: ChartsService, private __orderService: OrderService) { }
  constructor(private formBuilder: FormBuilder, private __eventService: EventService, private __router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
    // swal({
    //   type: 'success',
    //   title: 'Usuario Guardado',
    //   showConfirmButton: false,
    //   timer: 1500
    // });
    this.ruta = Uris.API_FILES_ENDPOINT
    this.insForm = formBuilder.group({
      "id": [null],
      "numberPeople": [null],
      "name": [null, Validators.compose([Validators.required])],
      "email": [null, Validators.compose([Validators.required])],
      "user": [[], Validators.compose([Validators.required])],
      "descripcion": [null, Validators.compose([Validators.required])],
    });
  }

  public updateProfile() {
    console.log("Datos update-->", this.cellphone, this.gender, this.study_level, this.job, this.company)
    if (this.cellphone === null || this.company === null || this.gender === null || this.job === null || this.study_level === null) {
      Swal.fire({ type: 'warning', title: 'Faltan datos obligatorios', text: '' });
    } else {
      this.userService.update({
        user: {
          id: this.user.id,
          cellphone: this.cellphone,
          gender: this.gender,
          study_level: this.study_level,
          job: this.job,
          company: this.company
        }
      }).subscribe(data => {
        console.log("Datos del update del perfil -->", data)
        if (data.result === "true") {
          this.noCompleteProfile.hide()
          localStorage.setItem('currentUser', JSON.stringify(data));
          Swal.fire({ type: 'success', title: 'Tu perfil fue actualizado', text: 'Exitosamente' });
        } else {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
        }
      })
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
        this.eventModal.hide()
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
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("Imagenes -->", this.imageChangedEvent)
  }
  /*imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("Imagen cropped -->", this.croppedImage)
  }*/
  imageLoaded() {

  }
  loadImageFailed() {
    // show message
  }
  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:application\/(pdf);base64,/, "") : base64;;
  }OnInit() {
  }

}
