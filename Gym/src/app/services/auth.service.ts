import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = '';

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  login(data: object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/auth/login`, data, { headers: headers });
  }
}
