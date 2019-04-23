import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uris } from '../../../services/Uris';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scomprobante-pago',
  templateUrl: './scomprobante-pago.component.html',
  styleUrls: ['./scomprobante-pago.component.css']
})
export class ScomprobantePagoComponent implements OnInit {
  user: any;
  queryParams: any;
  data: any = [];
  data2: any = [];
  data3: any = [];
  ruta: any;
  isStored: Boolean = false;
  imageChangedEvent: any = '';
  public insForm: FormGroup;
  public valForm: FormGroup;
  public loading: Boolean = false;
  public edit: Boolean = false;
  public filter;

  constructor(private __router: Router, private formBuilder: FormBuilder, private __eventService: EventService, private activatedRoute: ActivatedRoute) {
    this.ruta = Uris.API_FILES_ENDPOINT
    this.queryParams = this.activatedRoute.snapshot.params.id
    console.log("queryParams -->", this.queryParams);
    this.valForm = formBuilder.group({
      "proof_file": ['']
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
          },
          /*payment: {
            id: this.queryParams
          }*/
        }
      ).subscribe((data) => {
        console.log("Datos -->", data)
        this.data = data.suscriptions;
        /*for (let i = 0; i < data.suscriptions.length; i++) {
          //this.data2.push(data.inscriptions[i]);
          if(data.suscriptions[i].payment.status!='PAGADO'){
            this.data3.push(data.suscriptions[i]);
          }
        }*/
        console.log("data3", this.data3);
        
      }, e => {
        console.log(e);
      });
      this.__eventService.myFacturationData({}).subscribe((data2) => {
        console.log("Datos -->", data2)
        this.data2 = data2.facturation_data;
      }, e => {
        console.log(e);
      });
      /*this.__eventService.paymentsIndex(
        {
          event: {
            id: this.queryParams
          }
        }
      ).subscribe((data3) => {
        console.log("Datos -->", data3)
        this.data3 = data3
      }, e => {
        console.log(e);
      });*/
    }
  }
  

  public valFormSave($ev: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.loading = true;
      console.log("Form -->", this.valForm.value);
      this.__eventService.uploadProofFile({
        inscription: this.valForm.value
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

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
  }
  

  

  fileChangeEvent(event: any): void {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    /*if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }*/
    getBase64(file).then(data => {
      console.log("Imagen 1 =>", data)
      let image = ''
      image = this.cleanBase64(String(data))
      console.log("Base 64", image)
      this.valForm.controls['proof_file'].setValue(image)
      this.imageChangedEvent = data
    })
  }
  
  
  
  imageLoaded() {
  }
  loadImageFailed() {
  }

  saveImage() {
    console.log("Imagen del formulario", this.valForm.value.proof_file)
    this.isStored = true
  }
  
  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png|pdf);base64,/, "") : base64;
  }


  public save(id, id_payment) {
    console.log("Formulario -->", this.valForm.value);
    console.log("ID -->", this.queryParams);
      //$ev.preventDefault();
      for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
        this.loading = true;
        this.__eventService.uploadProofFile({
          
            //payment: { id: this.valForm.value.payment_id},
            "proof_file": this.valForm.value.proof_file,
            event: { id: id, "proof_file": this.valForm.value.proof_file},
            payment: {id: id_payment,
              "proof_file": this.valForm.value.proof_file
            }
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Archivo Guardado', text: 'El archivo ha sido subido exitosamente.' });
            //location.replace('#/my-events');
            //
            this.ngOnInit();
            this.loading = false;
          } else {
            Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: data.message[0] });
            this.loading = false;
          }
          this.cleanForm();
          this.ngOnInit()
          this.loading = false;
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
          this.loading = false;
        });
      }
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



function formattedDate(d) {
  d = new Date(d)
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

export class Usuario {
  id: number
  name: string
  email: string
}
