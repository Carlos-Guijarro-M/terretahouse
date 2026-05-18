import { Component, ChangeDetectorRef } from '@angular/core';
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
  tituloPagina: string = 'Mis Reservas';
  isAdmin: boolean = false;

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

    this.isAdmin = usuario.roles.includes('ROLE_ADMIN');
    if (this.isAdmin) {
      this.tituloPagina = 'Gestión de Actividades';

      //Si soy ADMIN
      this.reservaService.getActividades().subscribe(
        (respuesta: any) => {
          this.reservas = respuesta;
          this.cdr.detectChanges();
        }
      );

    } else {
      this.tituloPagina = 'Mis Reservas';
    
      //Si spoy USUARIO 
      this.reservaService.getReservas().subscribe(
        (respuesta: any) => {
          this.reservas = respuesta;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error al cargar las reservas:', error);
        }
      );
    }
  }
}
