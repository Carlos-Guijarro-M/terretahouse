import { Component } from '@angular/core';
import { Reserva } from '../../services/reserva';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.html',
  styleUrls: ['./mis-reservas.css']
})
export class MisReservas {

  reservas: any[] = [];

  constructor(private reservaService: Reserva) {}

  ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  this.reservaService.getReservas(user.id).subscribe({
      next: (res: any) => {
        this.reservas = Array.isArray(res) ? res : [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}