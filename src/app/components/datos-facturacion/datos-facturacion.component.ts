import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Uris } from '../../services/Uris';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
//import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
//import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { observable } from 'rxjs';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-datos-facturacion',
  templateUrl: './datos-facturacion.component.html',
  styleUrls: ['./datos-facturacion.component.css']
})
export class DatosFacturacionComponent implements OnInit {

  data: any = [];
  data2: any = [];
  user: any;
  facturation_data : any;
  public valForm: FormGroup;
  public valformFacturation: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public loading: Boolean = false;
  public edit: Boolean = false;
  public isStored: Boolean = false;
  public arrayFacturation: any = []
  ruta: any;
  @ViewChild('facturationModal') private facturationModal: any;


  constructor(private formBuilder: FormBuilder, private __userService: UserService, private __eventService: EventService) {
    this.valForm = formBuilder.group({
      "id": [null],
      "email": [null],
      "name": [null, Validators.compose([Validators.required])],
      "lastname": [null, Validators.compose([Validators.required])],
      "phone": [null],
      "admin": [false],
      "avatar": [null],
      "rfc": [null],
      "razon_social": [null]
    });
    this.valformFacturation = formBuilder.group({
      "razon_social": [null],
      "rfc": [null],
      "payment_method": [null],
      "uso_cfdi": [null],
      "id": [null]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
      console.log("Usuarios -->", this.user)
    }
    if (!this.user.admin) {
      this.__eventService.myFacturationData({}).subscribe((data) => {
        console.log("Datos -->", data)
        this.data = data.facturation_data;
      }, e => {
        console.log(e);
      });
    }
    this.ruta = Uris.API_FILES_ENDPOINT
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("Imagenes -->", this.imageChangedEvent)
    this.isStored = false
  }
  /*imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("Imagen cropped -->", this.croppedImage)
    this.valForm.controls['avatar'].setValue(this.cleanBase64(this.croppedImage))
  }*/
  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png);base64,/, "") : base64;
  }
  public cancel() {
    this.edit = false
    this.cleanForm();
  }
  saveImage() {
    console.log("Imagen del formulario", this.valForm.value.avatar)
    this.isStored = true
  }

  facturacion() {
    this.facturationModal.show()
    this.__eventService.myFacturationData({}).subscribe((data) => {
      console.log("Datos al guardar -->", data);
      this.arrayFacturation = data.facturation_data
    }, e => {
      // swal({ icon: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
    });
  }

  saveFacturation($ev: any) {
    $ev.preventDefault();
    for (let c in this.valformFacturation.controls) {
      this.valformFacturation.controls[c].markAsTouched();
    }
    console.log(this.valformFacturation)
    if (this.valformFacturation.valid) {
      this.loading = true;
      console.log("Form -->", this.valformFacturation.value);
      this.__eventService.addFacturationData({
        facturation_data: this.valformFacturation.value
      }).subscribe((data) => {
        console.log("Datos al guardar -->", data);
        if (data.result == "true") {
          Swal.fire({ type: 'success', title: 'Dato de facturación', text: 'Fue creado exitosamenete.' });
          this.ngOnInit()
        } else {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: data.message[0] });
          this.loading = false;
        }
        this.valformFacturation.reset()
        this.__eventService.myFacturationData({}).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          this.arrayFacturation = data.facturation_data
        })
        this.loading = false;
      }, e => {
        Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
        this.loading = false;
      });
    }
  }

  public deleteFacturation(item) {
    console.log("Item -->", item)
    this.__eventService.destroyFacturationData({
      facturation_data: {
        id: item
      }
    }).subscribe((data) => {
      console.log("Datos al guardar -->", data);
      if (data.result == "true") {
        Swal.fire({ type: 'success', title: 'Dato de facturación eliminado', text: '' });
        //this.facturationModal.hide()
        this.ngOnInit()
        location.replace("#/datos-facturacion");
      } else {
        Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: data.message[0] });
      }
    }, e => {
      Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: 'Hay problemas para eliminar información, intentalo más tarde.' });
      this.loading = false;
    });
    /*Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }else{
        result.value==null;
      }
      this.ngOnInit();*/
  }

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.edit = false
  }
  public save($ev: any) {
    if (this.edit) {
      this.editF(this.valformFacturation.value.id, $ev)
    } else {
      $ev.preventDefault();
      for (let c in this.valformFacturation.controls) {
        this.valformFacturation.controls[c].markAsTouched();
      }
      if (this.valformFacturation.valid) {
        this.loading = true;
        console.log("Form -->", this.valformFacturation.value);
        this.__eventService.addFacturationData({
          facturation_data: this.valformFacturation.value
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Dato de facturación', text: 'Fue creado exitosamenete.' });
            this.ngOnInit()
          } else {
            Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: data.message[0] });
            this.loading = false;
          }
          this.valformFacturation.reset()
          this.__eventService.myFacturationData({}).subscribe((data) => {
            console.log("Datos al guardar -->", data);
            this.arrayFacturation = data.facturation_data
          })
          this.loading = false;
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
          this.loading = false;
        });
      }
    }
  }
  public editF(params, $ev) {
    console.log("Evente edit -->", $ev);
    if (this.edit && $ev) {
      $ev.preventDefault();
      for (let c in this.valformFacturation.controls) {
        this.valformFacturation.controls[c].markAsTouched();
      }
      if (this.valformFacturation.valid) {
        this.loading = true;
        console.log("Form -->", this.valformFacturation.value);

        this.__eventService.updateFacturationData({
          facturation_data: {
            "razon_social": this.valformFacturation.value.razon_social,
            "rfc": this.valformFacturation.value.rfc,
            "payment_method": this.valformFacturation.value.payment_method,
            "uso_cfdi": this.valformFacturation.value.uso_cfdi,
            "id": this.valformFacturation.value.id
          }
        }).subscribe((data) => {
          Swal.fire({ type: 'success', title: 'Facturación Actualizada', text: 'La facturación fue actualizada exitosamente.' });
          console.log("Data edit -->", data);
          this.cleanForm();
          this.ngOnInit()
          this.loading = false;
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
          this.loading = false;
        });
      }
    } else {
      this.__eventService.myFacturationData({
          id: params.id
      }).subscribe((data) => {
        console.log("edit data params-->", data, params);
        for(let i=0; i<data.facturation_data.length; i++){
          if(data.facturation_data[i].id==params){
            this.data2 = data.facturation_data[i];
            console.log(this.data2);
          }
      }
        this.valformFacturation.controls["razon_social"].setValue(this.data2.razon_social)
        this.valformFacturation.controls["rfc"].setValue(this.data2.rfc)
        this.valformFacturation.controls["payment_method"].setValue(this.data2.payment_method)
        this.valformFacturation.controls["uso_cfdi"].setValue(this.data2.uso_cfdi)
        this.valformFacturation.controls["id"].setValue(this.data2.id)
        this.edit = true
        window.scrollTo(0, 0)
      })
    }
  }

}
