import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EntrenadoresService } from 'src/app/services/entrenadores.service';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class EntrenadorComponent {
  
  entrenadorDialog: boolean = false;
  entrenadores: any[] = [];
  entrenador: any = {};
  selectedEntrenadores: any[] = [];
  formEntrenador: FormGroup;
  imgURL: any = '../../../../assets/img/descarga.png';
  token: string | null = '';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private entrenadorService: EntrenadoresService) { 
    this.formEntrenador = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      salary: [''],
      photo: [''],
    });

    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
      this.cargarDatos();
  }

  cargarDatos(): void {
    this.entrenadorService.getEntrenadores(this.token?this.token:'').subscribe(
      response => {
        this.entrenadores = response;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
      }
    );
  }

  openNew() {
    this.entrenador = {};
    this.entrenadorDialog = true;
  }

  deleteSelectedEntrenadores() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que deseas eliminar los entrenadores seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entrenadores = this.entrenadores.filter(val => !this.selectedEntrenadores.includes(val));
        this.selectedEntrenadores = [];
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se han eliminados los entrenadores', life: 3000 });
      }
    });
  }

  editEntrenador(entrenador: any) {
    this.entrenador = entrenador;
    this.formEntrenador.patchValue({
      name: entrenador.name,
      lastname: entrenador.lastname,
      telephone: entrenador.telephone,
      address: entrenador.address,
      documentType: entrenador.documentType,
      documentNumber: entrenador.documentNumber,
      salary: entrenador.salary,
      photo: entrenador.photo,
    });
    this.imgURL = `data:image/png;base64,${this.entrenador.photo}`;
    this.entrenadorDialog = true;
  }

  deleteEntrenador(entrenador: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro que quieres eliminar ' + entrenador.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entrenadorService.eliminarEntrenador(entrenador.documentNumber, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrenador eliminado', life: 3000 });
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }
    });
  }

  hideDialog() {
    this.entrenadorDialog = false;
  }

  saveEntrenador(data: any) {
    console.log(data);
    if(this.formEntrenador.valid){
      if(this.entrenador.documentNumber){
        this.entrenadorService.modificarEntrenador(data, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha modificado un entrenador', life: 3000 });
            this.formEntrenador.reset();
          },error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }else{
        this.entrenadorService.agregarEntrenador(data, this.token?this.token:'').subscribe(
          response => {
            this.cargarDatos();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha creado un nuevo entrenador', life: 3000 });
            this.formEntrenador.reset();
          },error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en el servidor', life: 3000 });
          }
        );
      }
    }else{
      this.formEntrenador.markAllAsTouched();
    }
  }

  changephoto(data: any):void {
    let reader = new FileReader();
    reader.readAsDataURL(data[0]);
    reader.onload = (e) => {
      this.imgURL = reader.result;
      const photo = (<string>this.imgURL)?.split(',')[1];
      console.log(this.imgURL);
      this.formEntrenador.patchValue({
        photo: photo,
      });  
    }
  }
}
