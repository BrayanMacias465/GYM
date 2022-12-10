import { NgModule } from '@angular/core';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/administrador/clientes/clientes.component';
import { EntrenadorComponent } from './components/administrador/entrenador/entrenador.component';

const routes: Routes = [
  { path: 'inicio', component: BodyComponent },
  { path: 'administrador', children: [
    { path: 'autenticacion', component: LoginComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'entrenadores', component: EntrenadorComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
