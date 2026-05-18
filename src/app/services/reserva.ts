import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reserva {

  private url = 'http://localhost:8000/api/reservas';

  constructor(private http: HttpClient) { }

  // Obtiene las reservas del usuario logueado
  getReservas() {
    return this.http.get(this.url, { headers: this.getAuthHeaders() });
  }

  // Envía los datos para crear una nueva reserva
  crearReserva(data: any) {
    return this.http.post(this.url, data, { headers: this.getAuthHeaders() });
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