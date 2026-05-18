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
export class MisReservas implements OnInit {

  reservas: any[] = [];

  constructor(
    private reservaService: Reserva, 
    private auth: Auth,
    private cdr: ChangeDetectorRef // 👈 Inyectamos el detector de cambios
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
    console.log('Intento de carga de reservas para:', user);

    if (!user) {
      console.warn('No hay sesión de usuario en localStorage');
      return;
    }

    this.reservaService.getReservas().subscribe({
      next: (res: any) => {
        // Asignamos los datos creando una nueva referencia de array
        this.reservas = Array.isArray(res) ? [...res] : [];
        console.log('RESERVA DETALLADA:', JSON.stringify(this.reservas));
        
        // 👈 Forzamos a Angular a renderizar la pantalla AHORA
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error cargando reservas:', err);
      }
    });
  }
}