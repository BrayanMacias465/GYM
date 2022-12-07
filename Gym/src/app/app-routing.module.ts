import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inicio', component: BodyComponent }
  { path: 'administrador', children: [
    { path: 'autenticacion', component: LoginComponent  }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
