import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ClientesService } from 'src/app/services/clientes.service'; 

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
  formCliente: FormGroup;
  imgURL: any = '../../../../assets/img/descarga.png';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private clienteService: ClientesService) { 
    this.formCliente = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      emergencyNumber: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      finishDate: ['', [Validators.required]],
      padece: [''],
      foto: [''],
    });
  }

  ngOnInit() {
    this.clientes = [
      {
        "name": "Pepito",
        "lastname": "Perez",
        "telephone": "3213689656",
        "address": "av 3 No 8989",
        "documentType": "CC",
        "documentNumber": "963256",
        "emergencyNumber": "45647658789",
        "startDate": "2022-12-08",
        "finishDate": "2022-12-30",
        "missingDays": 22
      }
    ];
    /* this.clienteService.getClientes('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwiaWF0IjoxNjcwNjQwMTAzLCJleHAiOjE2NzA2NDM3MDN9.WmgrfCf-IXLN-BJ7050dMe2oCdg-qyipZhpvoDH2wjn4SFwSHtZEjiVs0ho8uXySI-Fa1xQxXxBVY70QbGWivA').subscribe(
      response => {
        this.clientes = response;
      },
      error => {
        alert('Ocurrio un error');
      }
    ); */
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

  saveCliente(data: any) {

    if(this.formCliente.valid){
      data.foto = this.imgURL;
      this.clientes.push(data);
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha creado un nuevo cliente', life: 3000 });
      this.formCliente.reset();
    }else{
      this.formCliente.markAllAsTouched();
    }
    /* if (this.cliente.name.trim()) {
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
    } */
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

  changeFoto(data: any):void {
    let reader = new FileReader();
    reader.readAsDataURL(data[0]);
    reader.onload = (e) => {
      this.imgURL = reader.result;
      this.formCliente.patchValue({
        foto: this.imgURL,
      });
    }
  }
}
