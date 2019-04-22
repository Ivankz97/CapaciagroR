import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Uris } from '../../../services/Uris';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper/ngx-image-cropper';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public model: any = {};
  public valForm: FormGroup;
  public valFormUser: FormGroup;
  public returnUrl: string;
  public currentUser: any = {};
  public loading: boolean = false;
  public toasterConfig: any;
  public errored: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isStored = false;
  isNew = false;
  @ViewChild('forgotPassword') 
  forgotPassword: any;
  user: any;
  public edit: Boolean = false;
  ruta: any;
  url : string = "http://68.183.18.239/";
  @ViewChild('facturationModal') private facturationModal: any;

  constructor(private formBuilder: FormBuilder, private __userService: UserService) { 
    this.valFormUser = formBuilder.group({
      "id": [null],
      "email": [null, Validators.compose([Validators.required])],
      "name": [null, Validators.compose([Validators.required])],
      "lastname": [null, Validators.compose([Validators.required])],
      //"phone": [null, Validators.compose([Validators.required])],
      "birthdate": [null, Validators.compose([Validators.required])],
      "cellphone": [null, Validators.compose([Validators.required])],
      "gender": [null, Validators.compose([Validators.required])],
      "company": [null, Validators.compose([Validators.required])],
      "admin": [false],
      "avatar": [''],
      //"password": [null]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) : (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user);
    }
    this.ruta = Uris.API_FILES_ENDPOINT
    //this.edit = false;
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
      this.valFormUser.controls['avatar'].setValue(image)
      this.imageChangedEvent = data
      console.log("Imagen del formulario", this.valFormUser.value.avatar)
      this.isStored = true
    })
  }
  
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("Imagen cropped -->", this.croppedImage)
    this.valFormUser.controls['avatar'].setValue(this.cleanBase64(this.croppedImage))
  }
  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png);base64,/, "") : base64;
  }
  public cancel() {
    this.edit = false
    this.cleanForm();
  }
  saveImage() {
    console.log("Imagen del formulario", this.valFormUser.value.avatar)
    this.isStored = true
  }
  
  public cleanForm() {
    //this.valForm.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.edit = false
  }

  public save($ev: any) {
    if (this.edit) {
      this.editF(this.valFormUser.value.id, $ev)
    } else {
      $ev.preventDefault();
      for (let c in this.valFormUser.controls) {
        this.valFormUser.controls[c].markAsTouched();
      }
      if (this.valFormUser.valid) {
        this.loading = true;
        console.log("Form -->", this.valFormUser.value);
        this.__userService.update({
          user: this.valFormUser.value
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Perfil Actualizado', text: 'El Perfil fue actualizado exitosamente.' });
          } else {
            Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: data.message[0] });
            this.loading = false;
          }
          this.loading = false;
          this.isStored = false;
          this.cleanForm();
          this.ngOnInit();
          
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
      for (let c in this.valFormUser.controls) {
        this.valFormUser.controls[c].markAsTouched();
        console.log("hello");
      }
      if (this.valFormUser.valid) {
        this.loading = true;
        //console.log(this.valFormUser.value.avatar);
        console.log("Form -->", this.valFormUser.value);

        this.__userService.update({
          user: this.valFormUser.value
        }).subscribe((data) => {
          Swal.fire({ type: 'success', title: 'Perfil Actualizado', text: 'El Perfil fue actualizado exitosamente.' });
          console.log("Data edit -->", data);
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.loading = false;
          this.isStored = false;
          this.cleanForm();
          this.ngOnInit();
          //this.edit = false;
          
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
        this.valFormUser.controls['id'].setValue(this.user.id)
        this.valFormUser.controls["name"].setValue(data.user.name)
        this.valFormUser.controls["lastname"].setValue(data.user.lastname)
        this.valFormUser.controls["email"].setValue(data.user.email)
        this.valFormUser.controls["cellphone"].setValue(data.user.cellphone)
        this.valFormUser.controls["gender"].setValue(data.user.gender)
        this.valFormUser.controls["company"].setValue(data.user.company)
        //this.valFormUser.controls["avatar"].setValue("")
        this.edit = true;
        window.scrollTo(0, 0)
      })
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
