import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink], // Eliminamos CommonModule ya que usamos @if
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  // Hacemos el servicio público para poder usarlo directamente en el HTML
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