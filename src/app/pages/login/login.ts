import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
      password: this.contrasenya
    }).subscribe({
      next: (res: any) => {
        this.auth.setUser(res.user);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Error login';
      }
    });
  }
}