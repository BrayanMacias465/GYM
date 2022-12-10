import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css']
})
export class EntrenadorComponent {
  entrenadorDialog: boolean = false;
  entrenadors: any[] = [];
  entrenador: any = {};
  selectedEntrenadors: any[] = [];
  formEntrenador: FormGroup;
  imgURL: any = '../../../../assets/img/descarga.png';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { 
    this.formEntrenador = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      emergencyNumber: ['', [Validators.required]],
      padece: [''],
      foto: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  openNew() {
    this.entrenador = {};
    this.entrenadorDialog = true;
  }

  deleteSelectedEntrenadors() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que deseas eliminar los entrenadors seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entrenadors = this.entrenadors.filter(val => !this.selectedEntrenadors.includes(val));
        this.selectedEntrenadors = [];
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se han eliminados los entrenadors', life: 3000 });
      }
    });
  }

  editEntrenador(entrenador: any) {
    this.entrenador = { ...entrenador };
    this.entrenadorDialog = true;
  }

  deleteEntrenador(entrenador: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro que quieres eliminar ' + entrenador.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entrenadors = this.entrenadors.filter(val => val.id !== entrenador.id);
        this.entrenador = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrenador eliminado', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.entrenadorDialog = false;
  }

  saveEntrenador(data: any) {

    if(this.formEntrenador.valid){
      alert('is valido');
    }else{
      this.formEntrenador.markAllAsTouched();
    }
    /* if (this.entrenador.name.trim()) {
      if (this.entrenador.id) {
        this.entrenadors[this.findIndexById(this.entrenador.id)] = this.entrenador;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrenador Updated', life: 3000 });
      }
      else {
        this.entrenador.id = this.createId();
        this.entrenador.image = 'entrenador-placeholder.svg';
        this.entrenadors.push(this.entrenador);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Entrenador Created', life: 3000 });
      }

      this.entrenadors = [...this.entrenadors];
      this.entrenadorDialog = false;
      this.entrenador = {};
    } */
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.entrenadors.length; i++) {
      if (this.entrenadors[i].id === id) {
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
    alert('change file');
    let reader = new FileReader();
    reader.readAsDataURL(data[0]);
    reader.onload = (e) => {
      this.imgURL = reader.result;
    }
  }
}
