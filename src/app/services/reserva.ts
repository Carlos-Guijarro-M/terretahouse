import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reserva {

  private url = 'http://localhost:8000/api/reservas';
  private urlActividades = 'http://localhost:8000/api/actividades';

  constructor(private http: HttpClient) { }

  /* Rutas para reservas */
  // Obtiene las reservas del usuario logueado
  getReservas() {
    return this.http.get(this.url, { headers: this.getAuthHeaders() });
  }

  // Envía los datos para crear una nueva reserva
  crearReserva(data: any) {
    return this.http.post(this.url, data, { headers: this.getAuthHeaders() });
  }

  //Actualiza una reserva existente i edita los datos de una reserva
  actualizarReserva(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  //Elimina una reserva existente
  eliminarReserva(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  /* Rutas para actividades */
  // Obtiene todas las actividades
  getActividades() {
    return this.http.get(this.urlActividades);
  }

  // Envía los datos para crear una nueva actividad
  crearActividad(data: any) {
    return this.http.post(this.urlActividades, data, { headers: this.getAuthHeaders() });
  }

  //Actualiza una actividad
  actualizarActividad(id: number, data: any) {
    return this.http.put(`${this.urlActividades}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  //Elimina una actividad
  eliminarActividad(id: number) {
    return this.http.delete(`${this.urlActividades}/${id}`, { headers: this.getAuthHeaders() });
  }


  // 👇 MÉTODO AUXILIAR REUTILIZABLE: Centraliza la creación de la cabecera de seguridad
  private getAuthHeaders(): HttpHeaders {
    const userStorage = localStorage.getItem('user');
    let userId = '';

    if (userStorage) {
      const user = JSON.parse(userStorage);
      userId = user.id ? user.id.toString() : '';
    }

    return new HttpHeaders({
      'X-User-Id': userId
    });
  }
}