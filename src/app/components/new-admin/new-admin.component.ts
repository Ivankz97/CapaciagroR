/*
import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../../services/user.service';
import { ExcelService } from '../../services/ExportExcel';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CropperSettings, ImageCropperComponent, Bounds } from 'ng2-img-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ExcelService } from '../../services/ExportExcel';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  public data: any;
  public valForm: FormGroup;
  public loading: Boolean = false;
  public edit: Boolean = false;
  dataF: Usuario = new Usuario();
  public filter;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isStored = false;

  constructor(private formBuilder: FormBuilder, private __userService: UserService, private excelService: ExcelService) {
    this.valForm = formBuilder.group({
      "id": [null],
      "user":[null, Validators.compose([Validators.required])],
      "email": [null],
      "name": [null, Validators.compose([Validators.required])],
      "lastname": [null, Validators.compose([Validators.required])],
      "phone": [null],
      "admin": [true],
      "avatar": [null],
      "password": [null, Validators.compose([Validators.required])],
      "password_confirmation": [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.edit = false
    this.__userService.getAllAdmin({}).subscribe((data) => {
      console.log("Datos -->", data)
      this.data = data.users;
    }, e => {
      console.log(e);
    });
  }

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  public exportToExcel(event) {
    let array = []
    let base64PDF;
    console.log("Datos par excel -->",this.data)
    this.data.forEach(item => {
      array.push({'#': item.id, "Nombre": item.name, "Apellido": item.lastname, "Telefono": item.phone, "Correo electronico": item.email})
    });
    this.excelService.exportAsExcelFile(array, `Usuarios ${formattedDate(Date.now())}`);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("Imagenes -->", this.imageChangedEvent)
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("Imagen cropped -->", this.croppedImage)
    this.valForm.controls['avatar'].setValue(this.cleanBase64(this.croppedImage))
  }
  imageLoaded() {

  }
  loadImageFailed() {
    // show message
  }
  saveImage() {
    console.log("Imagen del formulario", this.valForm.value.avatar)
    this.isStored = true
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
  public delete(event) {
    console.log("EVENT -->", event);
    Swal.fire({
      title: '¿Seguro que deseas eliminar este patronato?',
      type: "warning",
      text: 'Los datos seran eliminados.',
      //buttons: ["Cancelar", "Aceptar"],
      //dangerMode: true,
    }).then((accepted) => {
      if (accepted) {
        this.__userService.delete({
          user: {
            id: event.id
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
          Swal.fire({ type: 'success', title: 'Usuario Actualizado', text: 'El Usuario fue actualizado exitosamenete.' });
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
      this.__userService.getOne({
        user: {
          id: params.id
        }
      }).subscribe((data) => {
        console.log("edit data params-->", data.user, params);
        this.valForm.controls["name"].setValue(data.user.name)
        this.valForm.controls["lastname"].setValue(data.user.lastname)
        this.valForm.controls["email"].setValue(data.user.email)
        this.valForm.controls["phone"].setValue(data.user.phone)
        this.valForm.controls["avatar"].setValue(data.user.avatar)
        this.edit = true
        window.scrollTo(0, 0)
      })
    }
  }

  public cancel() {
    this.edit = false
    this.cleanForm();
  }

  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png);base64,/, "") : base64;
  }

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