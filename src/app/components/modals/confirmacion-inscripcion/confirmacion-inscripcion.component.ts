import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uris } from '../../../services/Uris';
import { EventService } from '../../../services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmacion-inscripcion',
  templateUrl: './confirmacion-inscripcion.component.html',
  styleUrls: ['./confirmacion-inscripcion.component.css']
})
export class ConfirmacionInscripcionComponent implements OnInit {
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
    if (!this.user.admin) {
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

}
