import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(){

  }

  login(data: any): void {
    this.authService.login(data).subscribe(
      response => {
        sessionStorage.setItem('token', response.token);
        this.router.navigateByUrl('administrador/clientes');
      },error => {
        alert('ERROR');
      }
    );
  }
}
