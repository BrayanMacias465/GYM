import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ClientesComponent {

  clienteDialog: boolean = false;
  clientes: any[] = [];
  cliente: any = {};
  selectedClientes: any[] = [];
  submitted: boolean = false;
  statuses: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { 
    this.clientes = [
      { id: 1, nombre: 'Brayan', apellido: 'Macias', cedula: 185249 },
      { id: 2, nombre: 'Brayan', apellido: 'Macias', cedula: 185245 }
    ]
  }

  ngOnInit() {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.cliente = {};
    this.submitted = false;
    this.clienteDialog = true;
  }

  deleteSelectedClientes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected clientes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
        this.selectedClientes = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Deleted', life: 3000 });
      }
    });
  }

  editCliente(cliente: any) {
    this.cliente = { ...cliente };
    this.clienteDialog = true;
  }

  deleteCliente(cliente: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + cliente.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter(val => val.id !== cliente.id);
        this.cliente = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.clienteDialog = false;
    this.submitted = false;
  }

  saveCliente() {
    this.submitted = true;

    if (this.cliente.name.trim()) {
      if (this.cliente.id) {
        this.clientes[this.findIndexById(this.cliente.id)] = this.cliente;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Updated', life: 3000 });
      }
      else {
        this.cliente.id = this.createId();
        this.cliente.image = 'cliente-placeholder.svg';
        this.clientes.push(this.cliente);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Created', life: 3000 });
      }

      this.clientes = [...this.clientes];
      this.clienteDialog = false;
      this.cliente = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
