import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {

  url: string = '';

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  agregarEntrenador(data: object, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.post(`${this.url}/entrenadores`, data, { headers: headers });
  }

  modificarEntrenador(data: any, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.put(`${this.url}/entrenadores/${data.documentNumber}`, data, { headers: headers });
  }

  getEntrenadores(token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.get(`${this.url}/entrenadores`, { headers: headers });
  }

  eliminarEntrenador(cedula: string, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.delete(`${this.url}/entrenadores/${cedula}`, { headers: headers });
  }
}
