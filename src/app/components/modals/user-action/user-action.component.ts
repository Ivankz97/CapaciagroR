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

