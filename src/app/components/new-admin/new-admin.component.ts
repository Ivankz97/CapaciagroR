import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../../services/user.service';
import { ExcelService } from '../../services/ExportExcel';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  public model: any = {};
  public valForm: FormGroup;
  public valFormUser: FormGroup;
  public returnUrl: string;
  public currentUser: any = {};
  public loading: boolean = false;
  public toasterConfig: any;
  public errored: boolean = false;
  public email: any;
  public toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isStored = false;
  isNew = false;
  @ViewChild('forgotPassword') 
  forgotPassword: any;

  constructor(public toasterService: ToasterService, fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
    
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.required]
    });
    this.valFormUser = fb.group({
      "id": [null],
      "user":[null,Validators.compose([Validators.required])],//
      "email": [null],//
      "name": [null, Validators.compose([Validators.required])],//
      "lastnameP": [null, Validators.compose([Validators.required])],//
      "lastnameM": [null, Validators.compose([Validators.required])],//
      //"phone": [null],
      "admin": [true],
      //"avatar": [null],
      "password": [null, Validators.compose([Validators.required])],//
      "password_confirmation": [null, Validators.compose([Validators.required])]//
    });
  }

  /**
   * Este método es el que hace el proceso de login al momento de hacer click en el bontón.
   * 
   * @param  ev Evento del formulario
   */
  public forgot() {
    console.log(this.email)
    if (this.email) {
      this.forgotPassword.hide();
      this.authenticationService.forgotPassword({
        user: {
          email: this.email
        }
      }).subscribe(response => {
        console.log("RESPONSE -->", response)
        if (response.result === "true") {
          Swal.fire({ type: 'success', title: '', text: 'Se ha envíado un correo con las instrucciones de recuperación.' });
        } else {
          Swal.fire({ type: 'error', title: 'Conflictos revisé el correo proporcionado', text: 'Error' });
        }
      })
    } else {
      Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Debes ingresar un correo.' });
    }
  }

  public save($ev: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valFormUser.controls[c].markAsTouched();
    }
    if (this.valFormUser.valid) {
      this.loading = true;
      console.log("Form -->", this.valFormUser.value);
      this.authenticationService.create_user({
        user: this.valFormUser.value
      }).subscribe((data) => {
        console.log("Datos al guardar -->", data);
        if (data.result === true) {
          Swal.fire({ type: 'success', title: 'Usuario Guardado', text: 'El usuario fue creado exitosamenete.' });
          //localStorage.setItem('currentUser', JSON.stringify(data));
          location.replace('/');
          this.loading = false;
        } else {
          Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Error' });
          this.loading = false;
        }
        this.loading = false;
      }, e => {
        Swal.fire({ type: 'error', title: 'Conflictos Al Guardar', text: 'Hay problemas para guardar información, intentalo más tarde.' });
        this.loading = false;
      });
    }
  }

  submitForm($ev) {
    $ev.preventDefault();
    let objectUser = {}
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.errored = false;
      this.loading = true
      this.authenticationService.login(
        {
          email: this.valForm.get('email').value,
          password: this.valForm.get('password').value
        }
      ).subscribe(data => {
        console.log("DatosUser --> ", data);
        if (data.result === false) {
          this.errored = true;
          this.loading = false;
        } else {
          localStorage.setItem('currentUser', JSON.stringify(data));
          // this.router.navigate([this.returnUrl]);
          location.replace('/');
          this.loading = false;
        }
      }, err => {
        this.errored = true;
        this.loading = false;
      });
    }
  }


  public cleanForm() {
    this.valFormUser.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.isNew = false
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("Imagenes -->", this.imageChangedEvent)
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("Imagen cropped -->", this.cleanBase64(this.croppedImage))
    this.valFormUser.controls['avatar'].setValue(this.cleanBase64(this.croppedImage))
  }
  imageLoaded() {

  }
  loadImageFailed() {
    // show message
  }
  saveImage() {
    console.log("Imagen del formulario", this.valFormUser.value.avatar)
    this.isStored = true
  }
  cleanBase64(base64: string): string {
    return (base64) ? base64.replace(/^data:image\/(jpeg|jpg|png);base64,/, "") : base64;
  }
  public validarEmail(email) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
      return false
    else
      return true
  }
}
