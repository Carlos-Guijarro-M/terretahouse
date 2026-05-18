import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../services/reserva';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-reservas.html',
  styleUrls: ['./mis-reservas.css']
})
export class MisReservas implements OnInit {

  reservas: any[] = [];

  constructor(private reservaService: Reserva, private auth: Auth) {}

  ngOnInit() {
    const user = this.auth.getUser();
    console.log('Usuario activo:', user);

    if (!user?.id) {
      console.error('No user ID found in storage');
      return;
    }

    this.reservaService.getReservas(user.id).subscribe({
      next: (res: any) => {
        this.reservas = Array.isArray(res) ? res : [];
        console.log('Reservas cargadas:', this.reservas);
      },
      error: (err) => {
        console.error('Error cargando reservas:', err);
      }
    });
  }
}