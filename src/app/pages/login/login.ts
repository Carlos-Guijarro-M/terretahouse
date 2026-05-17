import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  contrasenya = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {

    this.error = '';

    if (!this.email || !this.contrasenya) {
      this.error = 'Rellena todos los campos';
      return;
    }

    this.auth.login({
      email: this.email,
      contrasenya: this.contrasenya
    }).subscribe({
      next: (res: any) => {
  localStorage.setItem('user', JSON.stringify(res.user));
  this.router.navigate(['/']);
},
      error: () => {
        this.error = 'Error login';
      }
    });
  }
}