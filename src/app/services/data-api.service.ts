import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { 

  }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getAllUsers(){
    const url_api = "http://157.230.182.120/nd/users";
    return this.http.get(url_api);
  }

}
