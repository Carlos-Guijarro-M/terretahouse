import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class MisReservas { 

  reservas: any[] = [];

  constructor(
    private reservaService: Reserva, 
    private auth: Auth,
    //Sirve para gestionar la detección de cambios de forma manual
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const usuario = this.auth.getUser();

    if (!usuario) {
      return;
    }

    this.reservaService.getReservas().subscribe(
      (respuesta: any) => {
        this.reservas = respuesta;
        this.cdr.detectChanges();
      }
    );
  }
}