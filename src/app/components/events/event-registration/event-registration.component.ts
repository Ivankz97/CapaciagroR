import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CropperSettings, ImageCropperComponent, Bounds } from 'ng2-img-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EventService } from '../../../services/event.service';
import { Uris } from '../../../services/Uris';
import { isNull } from 'util';
import Swal from 'sweetalert2';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from './../../../services/ExportExcel';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  public data: any = [];
  public valForm: FormGroup;
  public valFormPrice: FormGroup;
  public valFormUser: FormGroup;
  public loading: Boolean = false;
  public edit: Boolean = false;
  public filter;
  public arrayPrices = []
  dataF: Usuario = new Usuario();
  usuarios: any = []
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageChangedEvent2: any = '';
  croppedImage2: any = '';
  imageChangedEvent3: any = '';
  croppedImage3: any = '';
  imageChangedEvent4: any = '';
  croppedImage4: any = '';
  isStored: Boolean = false;
  isStored2: Boolean = false;
  isStored3: Boolean = false;
  isStored4: Boolean = false;
  number: number = 6671801706
  payments: any = []
  eventId: any;
  inscripcionID: any;
  ruta: any;
  event: any;
  @ViewChild('showModal') private showModal: any;
  @ViewChild('paymentsModal') private paymentsModal: any;
  @ViewChild('showModalChangeUser') private showModalChangeUser: any;

  // public customPatterns = {'0': { pattern: new RegExp('^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$')}};

  constructor(private __eventService: EventService, private formBuilder: FormBuilder, private __userService: UserService, private excelService: ExcelService) {
    this.valForm = formBuilder.group({
      "name": [null, Validators.compose([Validators.required])],
      "description": [null, Validators.compose([Validators.required])],
      "img1": [''],
      "img2": [''],
      "img3": [''],
      "img4": [''],
      "price": [null, Validators.compose([Validators.required])],
      "style": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "time": [null, Validators.compose([Validators.required])],
      "ad_text": [null, Validators.compose([Validators.required])],
      "max_capacity": [null],
      "id": [null]
    });
    this.valFormPrice = formBuilder.group({
      "event_id": [null],
      "name": [null, Validators.compose([Validators.required])],
      "min_people_amount": [null, Validators.compose([Validators.required])],
      "max_people_amount": [null, Validators.compose([Validators.required])],
      "price": [null, Validators.compose([Validators.required])],
    });
    this.valFormUser = formBuilder.group({
      "name": [null, Validators.compose([Validators.required])],
      "email": [null, Validators.compose([Validators.required])]
    });
    // this.arrayPrices = [{
    //   name: 'hola',
    //   min_people_amount: 'hola',
    //   max_people_amount: 'hola',
    //   price: 'hola'
    // },{
    //   name: 'hola',
    //   min_people_amount: 'hola',
    //   max_people_amount: 'hola',
    //   price: 'hola'
    // }];
    this.ruta = Uris.API_FILES_ENDPOINT

  }

  ngOnInit() {
    this.edit = false
    this.__eventService.getAll({}).subscribe((data) => {
      console.log("Datos -->", data)
      this.data = data.events;
    }, e => {
      console.log(e);
    });
  }

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
    this.imageChangedEvent2 = '';
    this.croppedImage = '';
    this.croppedImage2 = '';
    this.imageChangedEvent3 = '';
    this.croppedImage3 = '';
    this.imageChangedEvent4 = '';
    this.croppedImage4 = '';
    this.arrayPrices = []
  }
  deletePrice(index) {
    console.log(index);
    console.log("Datos para eliminar -->", this.arrayPrices)
    if (this.arrayPrices[index].id > 0) {
      this.__eventService.deleteSpecialPrice({
        special_price: {
          id: this.arrayPrices[index].id
        }
      }).subscribe(data => {
        console.log("Datos de eliminar -->", data)
        if (data.result === "true") {
          this.arrayPrices.splice(index, 1);
          // swal({ icon: 'success', title: 'Paquete eliminado', text: '' });        
        }
      })
    } else {
      this.arrayPrices.splice(index, 1);
    }
  }

  change(inscripcionID){
    console.log("Cambio de usuario inscripcion -->",inscripcionID);
    this.inscripcionID = inscripcionID;
    this.showModalChangeUser.show();
  }

  fileChangeEvent(event: any): void {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    getBase64(file).then(data => {
      console.log("Imagen 1 =>", data)
      let image = ''
      image = this.cleanBase64(String(data))
      console.log("Base 64", image)
      this.valForm.controls['img1'].setValue(image)
      this.imageChangedEvent = data
    })
  }
  fileChangeEvent2(event: any): void {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    getBase64(file).then(data => {
      console.log("Imagen 2 =>", data)
      let image = ''
      image = this.cleanBase64(String(data))
      this.valForm.controls['img2'].setValue(image)
      this.imageChangedEvent2 = data
    })
  }
  fileChangeEvent3(event: any): void {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    getBase64(file).then(data => {
      console.log("Imagen 3 =>", data)
      let image = ''
      image = this.cleanBase64(String(data))
      this.valForm.controls['img3'].setValue(image)
      this.imageChangedEvent3 = data
    })
  }
  fileChangeEvent4(event: any): void {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    getBase64(file).then(data => {
      console.log("Imagen 4 =>", data)
      let image = ''
      image = this.cleanBase64(String(data))
      this.valForm.controls['img4'].setValue(image)
      this.imageChangedEvent4 = data
    })
  }
  imageLoaded() {
  }
  loadImageFailed() {
  }

  saveImage() {
    console.log("Imagen del formulario", this.valForm.value.img1)
    this.isStored = true
  }
  saveImage2() {
    console.log("Imagen del formulario", this.valForm.value.img2)
    this.isStored2 = true
  }
  saveImage3() {
    console.log("Imagen del formulario", this.valForm.value.img2)
    this.isStored3 = true
  }
  saveImage4() {
    console.log("Imagen del formulario", this.valForm.value.img2)
    this.isStored4 = true
  }
  public addPrices($ev: any) {
    for (let c in this.valFormPrice.controls) {
      this.valFormPrice.controls[c].markAsTouched();
    }
    if (this.valFormPrice.valid) {
      // this.loading = true;
      console.log("Form -->", this.valFormPrice.value);
      this.arrayPrices.push(this.valFormPrice.value);
      console.log("Lista de preciós", this.arrayPrices)
      this.valFormPrice.reset();
    }
  }


  public savePrices(eventId) {
    for (let i = 0; i < this.arrayPrices.length; i++) {
      this.arrayPrices[i].event_id = eventId
      console.log("arrayPrices -->", this.arrayPrices)
      if (!this.arrayPrices[i].id) {
        this.__eventService.addPrice(this.arrayPrices[i]).subscribe(data => {
          console.log("Precios guardados", data);
        }, e => {
          console.log("Error", e);
        })
      }
    }
  }

  public saveUser(event) {
    console.log("Event -->",event)
    for (let c in this.valFormUser.controls) {
      this.valFormUser.controls[c].markAsTouched();
    }
    if (this.valFormUser.valid) {
      // this.loading = true;
      console.log("Form -->", this.valFormUser.value);
      this.__eventService.substituteUser({
        inscription:{
          id: this.inscripcionID
        },
        substitute: this.valFormUser.value
      }).subscribe(data => {
        console.log("RESPUESTA -->", data)
        if (data.result == "true") {
          Swal.fire({ type: 'success', title: '', text: 'El cambio de usuario fue realizado exitosamenete.' });
          this.showModalChangeUser.hide();
          this.showModal.hide()
          this.valFormUser.reset()
          this.ngOnInit()
        }
      })
    }
  }

  public show(id) {

    this.__eventService.eventInscriptions({ event: { id: id } }).subscribe(data => {
      console.log("DATOS In-->", data)
      // let users = []
      // for (let i = 0; i < data.suscriptions.length; i++) {
      //   users.push(data.suscriptions[i].user)
      // }
      this.usuarios = data.suscriptions
      this.showModal.show()
    })
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

  public save($ev: any) {
    console.log("Formulario -->", this.valForm.value);
    if (this.edit) {
      this.editF(this.valForm.value.id, $ev)
    } else {
      $ev.preventDefault();
      for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
        this.loading = true;
        let date = this.valForm.value.date
        let time = this.valForm.value.time
        date = date[0] + date[1] + '/' + date[2] + date[3] + '/' + date[4] + date[5] + date[6] + date[7]
        time = time[0] + time[1] + ':' + time[2] + time[3]

        this.__eventService.create({
          event: {
            "name": this.valForm.value.name,
            "description": this.valForm.value.description,
            "img1": this.valForm.value.img1,
            "img2": this.valForm.value.img2,
            "img3": this.valForm.value.img3,
            "img4": this.valForm.value.img4,
            "price": this.valForm.value.price,
            "style": this.valForm.value.style,
            "date": date,
            "time": time,
            "ad_text": this.valForm.value.ad_text,
            "max_capacity": this.valForm.value.max_capacity,
          }
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Evento Guardado', text: 'El evento fue creado exitosamenete.' });
            this.savePrices(data.event.id)
            this.fileChangeEvent = null
            this.fileChangeEvent2 = null
            this.fileChangeEvent3 = null
            this.fileChangeEvent4 = null
            location.replace('/');
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

  public delete(event) {
    console.log("EVENT -->", event);
    Swal.fire({
      title: '¿Seguro que deseas eliminar este evento?',
      type: "warning",
      text: 'Los datos seran eliminados.',
      //buttons: ["Cancelar", "Aceptar"],
      //dangerMode: true,
    }).then((accepted) => {
      if (accepted) {
        this.__eventService.delete({
          event: {
            id: event.id
          }
        }).subscribe(() => {
          Swal.fire({ type: 'success', title: 'Evento Eliminado', text: 'El Evento fue eliminado exitosamenete.' });
          this.ngOnInit()
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: 'Hay problemas para eliminar información, intentalo más tarde.' });
        })
      }
    });
  }
  public editF(params, $ev) {
    console.log("Evente edit -->", $ev);
    if (this.edit && $ev) {
      $ev.preventDefault();
      for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
        this.loading = true;
        let date = this.valForm.value.date
        let time = this.valForm.value.time
        date = date[0] + date[1] + '/' + date[2] + date[3] + '/' + date[4] + date[5] + date[6] + date[7]
        time = time[0] + time[1] + ':' + time[2] + time[3]
        console.log("Form -->", this.valForm.value);

        this.__eventService.update({
          event: {
            "name": this.valForm.value.name,
            "description": this.valForm.value.description,
            "img1": this.valForm.value.img1,
            "img2": this.valForm.value.img2,
            "img3": this.valForm.value.img3,
            "img4": this.valForm.value.img4,
            "price": this.valForm.value.price,
            "style": this.valForm.value.style,
            "date": date,
            "time": time,
            "ad_text": this.valForm.value.ad_text,
            "max_capacity": this.valForm.value.max_capacity,
            "id": this.valForm.value.id
          }
        }).subscribe((data) => {
          if (data.result === "true") {
            Swal.fire({ type: 'success', title: 'Evento Actualizado', text: 'El evento fue actualizado exitosamenete.' });
            this.savePrices(this.valForm.value.id)           
            console.log("Data edit -->", data);
            this.cleanForm();
            this.ngOnInit()
            this.loading = false;
          }
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
          this.loading = false;
        });
      }
    } else {
      this.__eventService.getOne({
        event: {
          id: params
        }
      }).subscribe((data) => {
        console.log("edit data params-->", data);
        this.valForm.controls['name'].setValue(data.event.name)
        this.valForm.controls['description'].setValue(data.event.description)
        this.valForm.controls['img1'].setValue(data.event.img1)
        this.valForm.controls['img2'].setValue(data.event.img2)
        this.valForm.controls['img3'].setValue(data.event.img3)
        this.valForm.controls['img4'].setValue(data.event.img4)
        this.valForm.controls['price'].setValue(data.event.price)
        this.valForm.controls['style'].setValue(data.event.style)
        this.valForm.controls['date'].setValue(data.event.date)
        this.valForm.controls['time'].setValue(data.event.time)
        this.valForm.controls['ad_text'].setValue(data.event.ad_text)
        this.valForm.controls['max_capacity'].setValue(data.event.max_capacity)
        this.valForm.controls['id'].setValue(data.event.id)
        this.arrayPrices = data.event.special_prices
        this.edit = true
        window.scrollTo(0, 0)
      })
    }
  }

  public cancel() {
    this.edit = false
    this.cleanForm();
  }

  public exportToExcel(event) {
    let array = []
    let base64PDF;
    console.log("Datos par excel -->",this.data)
    this.data.forEach(item => {
      array.push({'#': item.id, Nombre: item.name, Fecha: item.date, Hora: item.time, Precio: item.price, 'Capacidad del evento': item.max_capacity, "Numero de Inscripciones": item.inscriptions_count})
    });
    this.excelService.exportAsExcelFile(array, `Eventos ${formattedDate(Date.now())}`);
  }
  public exportToExcelForPayments(event) {
    let array = []
    let base64PDF;
    console.log("Datos par excel -->",this.payments)
    this.payments.forEach(item => {
      array.push({'Folio': item.folio, "Metodo de pago": item.method, "Estatus": item.status, "Total": item.total})
    });
    this.excelService.exportAsExcelFile(array, `Pagos del evento-${this.event.name}-${formattedDate(Date.now())}`);
  }
  public exportToExcelForInscripcion(event) {
    let array = []
    let base64PDF;
    console.log("Datos par excel -->",this.data)
    this.data.forEach(item => {
      array.push({'#': item.id, Nombre: item.name, Fecha: item.date, Hora: item.time, Precio: item.price, 'Capacidad del evento': item.max_capacity, "Numero de Inscripciones": item.inscriptions_count})
    });
    this.excelService.exportAsExcelFile(array, `Eventos ${formattedDate(Date.now())}`);
  }

  public validate(id) {
    this.__eventService.validate({ event: { id: this.eventId }, payment: { id } }).subscribe(data => {
      console.log("DATOS In-->", data)
      if (data.result === "true") {
        this.__eventService.eventInscriptions({ event: { id: this.eventId } }).subscribe(data2 => {
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
            this.paymentsModal.hide()
          }
        })
      }
    })
  }

  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png);base64,/, "") : base64;
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