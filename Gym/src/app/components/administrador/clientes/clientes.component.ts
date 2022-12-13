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
  token: string | null = '';

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
      medicalHistory: [''],
      photo: [''],
    });

    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
      this.cargarDatos();
  }

  cargarDatos(): void {
    this.clienteService.getClientes(this.token?this.token:'').subscribe(
      response => {
        this.clientes = response;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
      }
    );
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
    this.cliente = cliente;
    this.formCliente.patchValue({
      name: cliente.name,
      lastname: cliente.lastname,
      telephone: cliente.telephone,
      address: cliente.address,
      documentType: cliente.documentType,
      documentNumber: cliente.documentNumber,
      emergencyNumber: cliente.emergencyNumber,
      startDate: cliente.startDate,
      finishDate: cliente.finishDate,
      medicalHistory: cliente.medicalHistory,
      photo: cliente.photo
    });
    this.imgURL = `data:image/png;base64,${this.cliente.photo}`;
    this.clienteDialog = true;
  }

  deleteCliente(cliente: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro que quieres eliminar ' + cliente.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.eliminarCliente(cliente.documentNumber, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente eliminado', life: 3000 });
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }
    });
  }

  hideDialog() {
    this.clienteDialog = false;
  }

  saveCliente(data: any) {
    console.log(data);
    const startDate = new Date(data.startDate); 
    data.startDate = startDate.getDate() + '-' + (startDate.getMonth()+1) + '-' + startDate.getFullYear();
    const finishDate = new Date(data.finishDate);
    data.finishDate = finishDate.getDate() + '-' + (finishDate.getMonth()+1) + '-' + finishDate.getFullYear();
    console.log(data);
    if(this.formCliente.valid){
      if(this.cliente.documentNumber){
        this.clienteService.modificarCliente(data, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha modificado un cliente', life: 3000 });
            this.formCliente.reset();
            this.cliente = {};
          },error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }else{
        this.clienteService.agregarCliente(data, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha creado un nuevo cliente', life: 3000 });
            this.formCliente.reset();
          },error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }
    }else{
      this.formCliente.markAllAsTouched();
    }
  }

  changephoto(data: any):void {
    let reader = new FileReader();
    reader.readAsDataURL(data[0]);
    reader.onload = (e) => {
      this.imgURL = reader.result;
      const photo = (<string>this.imgURL)?.split(',')[1];
      console.log(this.imgURL);
      this.formCliente.patchValue({
        photo: photo,
      });  
    }
  }
}
