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
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  data: any = [];
  user: any;
  p: any;
  filter: any;
  prueba: any = ''
  loading: any = false
  ruta: any;
  modalRef: BsModalRef;
  arrayUsers: any = [];
  metodoPago: any
  cupon: any;
  public insForm: FormGroup;
  @Output("onRefresh")
  onRefresh = new EventEmitter<any>();
  @ViewChild('eventModal')
  eventModal: any;
  @ViewChild('childModal') public childModal:ModalModule;
  @ViewChild('noCompleteProfile')
  noCompleteProfile: any;
  url : string = "http://68.183.18.239/";
  constructor(private formBuilder: FormBuilder, private __eventService: EventService, private __router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.__eventService.myEvents({}).subscribe((data) => {
      console.log("Datos -->", data)
      this.data = data.inscriptions;
      console.log(this.data)
    }, e => {
      console.log(e);
    });
  }

}
