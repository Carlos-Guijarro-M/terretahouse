import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 ¡OBLIGATORIO para usar [(ngModel)] en los inputs!
import { Reserva } from '../../services/reserva';

@Component({
  selector: 'app-crear-reservas',
  imports: [CommonModule, FormsModule], // 👈 Añadimos estos dos para que funcionen los bucles y el formulario
  templateUrl: './crear-reservas.html',
  styleUrl: './crear-reservas.css',
})
export class CrearReservas implements OnInit {

  // 1. Array vacío para listar las actividades globales en la tabla
  actividades: any[] = [];

  // 2. Objeto temporal que se limpia y se rellena con los inputs del formulario
  nuevaActividad: any = {
    id: null, // Si tiene ID estamos editando, si es null estamos creando
    titulo: '',
    fecha: '',
    estado: 'disponible' // Valor por defecto del desplegable
  };

  constructor(private reservaService: Reserva, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Cuando lo conectemos con Symfony, aquí cargaremos los datos reales de la BD
    this.cargarActividadesReales();
  }

  //Leer las actividades de la BBDD
  cargarActividadesReales() {
    this.reservaService.getActividades().subscribe({
      next: (data: any) => {
        this.actividades = data;
        this.cdr.detectChanges(); // Forzamos la actualización de la vista con los datos reales
      },
      error: (err) => {
        console.error('Error al cargar las actividades reales:', err);
        alert('Error al cargar las actividades reales. Revisa la consola para más detalles.');
      }
    });
  }

  //Crear o editar en la BBDD
  guardarActividad(event: Event) {
    event.preventDefault(); // Evita que la página se recargue por completo

    if (this.nuevaActividad.id === null) {
      // --- MODO CREAR ---
      this.reservaService.crearActividad(this.nuevaActividad).subscribe({
        next: (response) =>{
          alert('¡Actividad creada con éxito en la BBDD!');
          this.limpiarFormulario();
          this.cargarActividadesReales(); // Recargamos la lista para mostrar la nueva actividad
        },
        error: (err) => {
          console.error('Error al crear la actividad:', err);
          alert('Error al crear la actividad. Revisa la consola para más detalles.');
        }
      });
    } else {
      // --- MODO EDITAR ---
      this.reservaService.actualizarActividad(this.nuevaActividad.id, this.nuevaActividad).subscribe({
        next: (response) =>{
          alert('¡Actividad editada con éxito en la BBDD!');
          this.limpiarFormulario();
          this.cargarActividadesReales(); // Recargamos la lista para mostrar los cambios
        },
        error: (err) => {
          console.error('Error al editar la actividad:', err);
          alert('Error al editar la actividad. Revisa la consola para más detalles.');
        }
      });
      }
    }

  // FUNCIÓN PARA CREAR O EDITAR (Se ejecuta al pulsar "Guardar Actividad")
  /*
  guardarActividad(event: Event) {
    event.preventDefault(); // Evita que la página se recargue por completo

    if (this.nuevaActividad.id === null) {
      // --- MODO CREAR ---
      // Simulamos un ID aleatorio para la prueba visual en la tabla
      const actividadCreada = {
        id: Math.floor(Math.random() * 100) + 1,
        titulo: this.nuevaActividad.titulo,
        fecha: this.nuevaActividad.fecha,
        estado: this.nuevaActividad.estado
      };

      this.actividades.push(actividadCreada);
      alert('¡Actividad creada con éxito (Simulación)!');
    } else {
      // --- MODO EDITAR ---
      // Buscamos la actividad en la lista por su ID y la actualizamos
      const index = this.actividades.findIndex(a => a.id === this.nuevaActividad.id);
      if (index !== -1) {
        this.actividades[index] = { ...this.nuevaActividad };
        alert('¡Actividad editada con éxito (Simulación)!');
      }
    }

    this.limpiarFormulario();
  }
    */

  //Borrar actividad de la BBDD
  eliminarActividad(id: number) {
    if (confirm('¿Seguro que quieres borrar esta actividad?')) {
      this.reservaService.eliminarActividad(id).subscribe({
        next: (response) => {
          alert('¡Actividad eliminada con éxito de la BBDD!');
          this.cargarActividadesReales(); // Recargamos la lista para reflejar la eliminación
        },
        error: (err) => {
          console.error('Error al eliminar la actividad:', err);
          alert('Error al eliminar la actividad. Revisa la consola para más detalles.');
        }
      });
    }
  }

  //Cargar datos de la actividad a editar en el formulario
  cargarParaEditar(actividad: any) {
    this.nuevaActividad = {
      id: actividad.id,
      titulo: actividad.titulo,
      fecha: actividad.fecha,
      estado: actividad.estado || 'disponible' // Si por alguna razón no tiene estado, ponemos el valor por defecto 
    };
  }


  // FUNCIÓN AUXILIAR: Resetea los campos del formulario tras guardar o editar
  limpiarFormulario() {
    this.nuevaActividad = {
      id: null,
      titulo: '',
      fecha: '',
      estado: 'disponible'
    };
  }

  /*
  simularCargarActividades() {
    this.actividades = [
      { id: 1, titulo: 'Tour Centro Histórico Valencia', fecha: '2026-06-15', estado: 'disponible' },
      { id: 2, titulo: 'Visita Guiada Albufera', fecha: '2026-07-20', estado: 'completo' }
    ];
  }
    */
}