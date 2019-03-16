import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { RequestOptions } from '@angular/http';

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