import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    currentUser: any = {};

    constructor(private http: Http) {
        this.currentUser = (localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : null;
    }

    login(user: any) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(Uris.API_LOGIN, user, new RequestOptions({ headers: headers })).map((response: Response) => response.json());
    }
    // loginClient(user: any) {
    //     let headers = new Headers(); headers.append('Content-Type', 'application/json');
    //     return this.http.post(Uris.API_LOGIN_CLIENT, user, new RequestOptions({ headers: headers })).map((response: Response) => response.json());
    // }
    sign_up(user: any){
        return this.http.post(Uris.API_SIGN_UP, user).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    
    create_user(user: any){
        user.admin = { token: this.currentUser };
        return this.http.post(Uris.API_CREATE_USER, user).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
       // return this.http.post(Uris.API_ENDPOINT+'add_admin', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    logout() {
        if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
            location.reload()
        }
    }

    forgotPassword(user){
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(Uris.FORGOT_PASSWORD, user, new RequestOptions({ headers: headers })).map((response: Response) => response.json());
    }

    errorHandler(error: any): void {
        console.log("SUPER ERROR",error)

        if (localStorage.getItem('currentUser') && error.status == 401) {
            localStorage.removeItem('currentUser');
            location.replace('login')
        }
    }

}