import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {

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
        return this.http.post(Uris.API_ENDPOINT+'create_event', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    update(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'update_event', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    delete(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'delete_event', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getOne(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'show_event', obj, this.jwt()).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getAll(obj) {
        obj.admin = { token: this.userToken };
        return this.http.get(Uris.API_ENDPOINT+'events_index').map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    myEvents(obj) {
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'my_events', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    addPrice(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'add_special_price', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    bulkRegister(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'bulk_register', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    eventInscriptions(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'event_inscriptions', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    getUserPayments(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'get_user_payments', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    uploadProofFile(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'upload_proof_file', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    validate(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'validate', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    deleteSpecialPrice(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'delete_special_price', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    addFacturationData(obj){
        obj.user = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'add_facturation_data', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    myFacturationData(obj){
        obj.user = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'my_facturation_data', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    updateFacturationData(obj){
        obj.admin = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'update_facturation_data', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    destroyFacturationData(obj){
        obj.user = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'destroy_facturation_data', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }
    substituteUser(obj){
        obj.user = { token: this.userToken };
        return this.http.post(Uris.API_ENDPOINT+'substitute_user ', obj).map((response: Response) => response.json()).catch((e: any) => Observable.throw(this.errorHandler(e)));        
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
