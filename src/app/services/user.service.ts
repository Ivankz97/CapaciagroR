import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Uris } from './Uris';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    private userToken: String;
    private user: any;
    constructor(public http: Http) {
        // console.log(localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')) {
            this.user = (<any>JSON.parse(localStorage.getItem('currentUser')).user) ? (<any>JSON.parse(localStorage.getItem('currentUser')).user) :  (<any>JSON.parse(localStorage.getItem('currentUser')).aarc_user) ;
            this.userToken = this.user.token
        }
    }
    create(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'create_user', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    update(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'update_user', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    delete(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'delete_user', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getOne(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'show_user', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getAll(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'users_index', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getAllAdmin(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'admins_index', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
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
