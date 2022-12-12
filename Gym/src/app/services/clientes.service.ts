import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url: string = '';

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  agregarCliente(data: object, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.post(`${this.url}/clientes`, data, { headers: headers });
  }

  modificarCliente(data: any, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.put(`${this.url}/clientes/${data.documentNumber}`, data, { headers: headers });
  }

  getClientes(token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.get(`${this.url}/clientes`, { headers: headers });
  }

  eliminarCliente(cedula: string, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':`Bearer ${token}`});
    return this._http.delete(`${this.url}/clientes/${cedula}`, { headers: headers });
  }

}
