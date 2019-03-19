import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { Observable } from '../../../node_modules/rxjs';
@Injectable({
  providedIn: 'root'
})
export class HarvestService {

  private userToken: String;
  private user: any;
  constructor(public http: Http) {
      if (localStorage.getItem('currentUser')) {
          this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) :  (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user) ;
          this.userToken = this.user.token
      }
  }

  create(obj) {
      obj.admin = { token: this.userToken };
      return this.http.post(Uris.API_ENDPOINT+'create_coupon', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  update(obj) {
      obj.admin = { token: this.userToken };
      return this.http.post(Uris.API_ENDPOINT+'update_coupon', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  delete(obj) {
      obj.admin = { token: this.userToken };
      return this.http.post(Uris.API_ENDPOINT+'delete_coupon', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  getOne(obj) {
      obj.admin = { token: this.userToken };
      return this.http.post(Uris.API_ENDPOINT+'show_coupon_u', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  getAll(obj) {
      obj.admin = { token: this.userToken };
      return this.http.post(Uris.API_ENDPOINT+'index_cupons',obj, this.jwt()).map((response: Response) => response.json())
  }

  errorHandler(error: any): void {
      console.log("SUPER ERROR",error)

      if (localStorage.getItem('currentUser') && error.status == 401) {
          localStorage.removeItem('currentUser');
          location.replace('login')
      }
  }

  private jwt() {
      if (this.userToken) {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return new RequestOptions({ headers: headers });
      }
  }

} 