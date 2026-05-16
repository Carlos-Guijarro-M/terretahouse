import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  contrasenya: string = '';

  login() {
    const user = {
      email: this.email,
      role: 'user'
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log('login OK');
    //console.log(user);
    window.location.href = '/';
  }
}
