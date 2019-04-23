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
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  data: any = [];
  data2: any = [];
  data3: any = [];
  data4: any = [];
  data5: any = [];
  events: any = []
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
      for (let i = 0; i < data.inscriptions.length; i++) {
        this.data2.push(data.inscriptions[i]);
        if(data.inscriptions[i].payment.status=='PAGADO'){
          this.events.push(data.inscriptions[i]);
        }
      }
      //Mostrar los eventos que han sido añadidos al carrito.
      //Elimina los elementos repetidos.
      for (let i = 0; i < data.inscriptions.length-1; i++) {
        //console.log(data.inscriptions[i].event.id);
        if(data.inscriptions[i].event.id!=data.inscriptions[i+1].event.id){
          //console.log(data.inscriptions[i].event.id);
          //data.inscriptions.pop(data.inscriptions[i].event.id);
          this.data3.push(data.inscriptions[i]);
        }
        
      }
      let contador = 0;
      let i,j;
      for(i = 0; i < this.data3.length; i++){
          for(j=0; j < contador; j++){
              if(this.data3[i].event.id == this.data4[j].event.id){
                  break;
              }
           }
          if(j == contador){
            this.data4.push(this.data3[i]);
            contador++;
          }
      }
      //console.log("data4",this.data4);
      //console.log(this.data3);
    }, e => {
      console.log(e);
    });
  }



}


/*REUTILIZAR 
for (let i = 0; i < data.inscriptions.length; i++) {
        if(data.inscriptions[i].payment.status=='PAGADO'){
          this.data2 = data.inscriptions[i];
          this.events.push(data.inscriptions[i]);
        }else{
          i++;
        }
        console.log("Hola",this.data2.event, i);
      }
      console.log("PAGOS UNICOS ->", this.events)

*/