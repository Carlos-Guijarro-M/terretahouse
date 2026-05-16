import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  contrasenya: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {

    this.error = '';

    if (!this.email || !this.contrasenya) {
      this.error = 'Rellena todos los campos';
      return;
    }

    const data = {
      email: this.email,
      password: this.contrasenya
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        console.log('Login OK', res);

        this.auth.setUser(res.user);

        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}