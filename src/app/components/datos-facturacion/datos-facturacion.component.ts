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

@Component({
  selector: 'app-datos-facturacion',
  templateUrl: './datos-facturacion.component.html',
  styleUrls: ['./datos-facturacion.component.css']
})
export class DatosFacturacionComponent implements OnInit {

  data: any = [];
  user: any;
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
        location.replace("#/datos-facturacion");
      } else {
        Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: data.message[0] });
      }
    }, e => {
      Swal.fire({ type: 'error', title: 'Conflictos Al Eliminar', text: 'Hay problemas para eliminar información, intentalo más tarde.' });
      this.loading = false;
    });
  }

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.edit = false
  }
  public save($ev: any) {
    if (this.edit) {
      this.editF(this.valForm.value.id, $ev)
    } else {
      $ev.preventDefault();
      for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
        this.loading = true;
        console.log("Form -->", this.valForm.value);
        this.__userService.create({
          user: this.valForm.value
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Usuario Guardado', text: 'El usuario fue creado exitosamenete.' });
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
  public editF(params, $ev) {
    console.log("Evente edit -->", $ev);
    if (this.edit && $ev != 0) {
      $ev.preventDefault();
      for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
        this.loading = true;
        console.log("Form -->", this.valForm.value);

        this.__userService.update({
          user: this.valForm.value
        }).subscribe((data) => {
          Swal.fire({ type: 'success', title: 'Perfil Actualizado', text: 'El Perfil fue actualizado exitosamenete.' });
          console.log("Data edit -->", data);
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.cleanForm();
          this.ngOnInit()
          this.loading = false;
        }, e => {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
          this.loading = false;
        });
      }
    } else {
      this.__userService.getOne({
        user: {
          id: params.id
        }
      }).subscribe((data) => {
        console.log("edit data params-->", data.user, params);
        this.valForm.controls['id'].setValue(this.user.id)
        this.valForm.controls["name"].setValue(data.user.name)
        this.valForm.controls["lastname"].setValue(data.user.lastname)
        this.valForm.controls["email"].setValue(data.user.email)
        this.valForm.controls["phone"].setValue(data.user.phone)
        this.valForm.controls["avatar"].setValue("")
        this.edit = true
      })
    }
  }

}
