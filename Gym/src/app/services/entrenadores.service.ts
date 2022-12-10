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

  agregarEntrenador(data: object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/services_usuarios/agregar.php`, data, { headers: headers });
  }

  modificarEntrenador(data: object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}/services_usuarios/editar.php`, data, { headers: headers });
  }

  getEntrenadores(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}/services_usuarios/seleccionar.php`, { headers: headers });
  }

  eliminarEntrenador(data: object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}/services_usuarios/seleccionar.php`, { headers: headers });
  }
}
