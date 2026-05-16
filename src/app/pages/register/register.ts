import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  email: string = '';
  password: string = '';
  confirmarPassword: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) { }

  register() {

    this.error = '';
    //Comprobar inputs vacios
    if (!this.email || !this.password || !this.confirmarPassword) {
      this.error = 'Rellena todos los campos';
      return;
    }

    //Comprobar las contraseñas
    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: (res) => {
        console.log('Usuario creado', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error register', err);
        this.error = 'Error en el registro';
      }
    });
  }
}