import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  // 1. Variable Junior: controla si el menú está a la vista (true) o escondido (false)
  menuAbierto: boolean = false;

  constructor(public auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.clearUser();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.auth.clearUser();
        this.router.navigate(['/login']);
      }
    });
  }
}