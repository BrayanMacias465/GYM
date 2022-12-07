import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: any[] = [];
  clientesSeleccionados: any[] = [];
  loading: boolean = false;
}
