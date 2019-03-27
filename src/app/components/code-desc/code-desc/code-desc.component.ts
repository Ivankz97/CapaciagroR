import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CropperSettings, ImageCropperComponent, Bounds } from 'ng2-img-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CouponService } from '../../../services/harvest.service';
import Swal from 'sweetalert2';
import { Uris } from '../../../services/Uris';

@Component({
  selector: 'app-code-desc',
  templateUrl: './code-desc.component.html',
  styleUrls: ['./code-desc.component.css']
})

export class CodeDescComponent implements OnInit {
/*
  public data: any;
  public valForm: FormGroup;
  public loading: Boolean = false;
  public edit: Boolean = false;
  dataF: Usuario = new Usuario();
  public filter;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isStored = false;

  constructor(private formBuilder: FormBuilder, private __couponService: CouponService) {
    this.valForm = formBuilder.group({
      "id": [null],
      "value": [null, Validators.compose([Validators.required])],
      "name": [null, Validators.compose([Validators.required])],
      "min_amount": [null, Validators.compose([Validators.required])],
      "expires_at": [null],
      "times_usable": [null],
    });
  }

  ngOnInit() {
    this.edit = false
    this.__couponService.getAll({}).subscribe((data) => {
      console.log("Datos -->", data)
      this.data = data.coupons;
    }, e => {
      console.log(e);
    });
  }

  public cleanForm() {
    this.valForm.reset();
    this.imageChangedEvent = '';
    this.croppedImage = '';
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
        let date = this.valForm.value.expires_at
        date = date[0]+date[1]+'/'+date[2]+date[3]+'/'+date[4]+date[5]+date[6]+date[7]

        this.__couponService.create({
          coupon: {
            value: this.valForm.controls['value'].value,
            name: this.valForm.controls['name'].value,
            min_amount: this.valForm.controls['min_amount'].value,
            expires_at: date,
            times_usable: this.valForm.controls['times_usable'].value,
          } 
        }).subscribe((data) => {
          console.log("Datos al guardar -->", data);
          if (data.result == "true") {
            Swal.fire({ type: 'success', title: 'Cupón Guardado', text: 'El cupón fue creado exitosamenete.' });
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
      title: '¿Seguro que deseas eliminar este cupón?',
      type: "warning",
      text: 'Los datos seran eliminados.',
      //buttons: ["Cancelar", "Aceptar"],
      //dangerMode: true,
    }).then((accepted) => {
      if (accepted) {
        this.__couponService.delete({
          coupon: {
            id: event.id
          }
        }).subscribe(() => {
          Swal.fire({ type: 'success', title: 'Cupón Eliminado', text: 'El Cupón fue eliminado exitosamenete.' });
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

        this.__couponService.update({
          coupon: this.valForm.value
        }).subscribe((data) => {
          Swal.fire({ type: 'success', title: 'Cupón Actualizado', text: 'El cupón fue actualizado exitosamenete.' });
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
      this.__couponService.getOne({
        coupon: {
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

export class Usuario {
  id: number
  name: string
  email: string
}
*/
ngOnInit(){
  
}
}