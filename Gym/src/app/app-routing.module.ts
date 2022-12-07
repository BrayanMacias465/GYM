import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'inicio', component: HeroesComponent }
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
