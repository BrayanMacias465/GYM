import { NgModule } from '@angular/core';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inicio', component: BodyComponent },
  { path: 'administrador', children: [
    { path: 'autenticacion', component: LoginComponent  }
  ]}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
