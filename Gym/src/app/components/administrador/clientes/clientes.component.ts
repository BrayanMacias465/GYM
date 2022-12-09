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

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { 

  }

  ngOnInit() {
  }

  openNew() {
    this.cliente = {};
    this.clienteDialog = true;
  }

  deleteSelectedClientes() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que deseas eliminar los clientes seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
        this.selectedClientes = [];
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se han eliminados los clientes', life: 3000 });
      }
    });
  }

  editCliente(cliente: any) {
    this.cliente = { ...cliente };
    this.clienteDialog = true;
  }

  deleteCliente(cliente: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro que quieres eliminar ' + cliente.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter(val => val.id !== cliente.id);
        this.cliente = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente eliminado', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.clienteDialog = false;
  }

  saveCliente() {

    if (this.cliente.name.trim()) {
      if (this.cliente.id) {
        this.clientes[this.findIndexById(this.cliente.id)] = this.cliente;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Updated', life: 3000 });
      }
      else {
        this.cliente.id = this.createId();
        this.cliente.image = 'cliente-placeholder.svg';
        this.clientes.push(this.cliente);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente Created', life: 3000 });
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
