import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reserva {

  private url = 'http://localhost:8000/api/reservas';

  constructor(private http: HttpClient) { }

  getReservas() {
    // 1. Obtenemos el usuario del localStorage
    const userStorage = localStorage.getItem('user');
    let userId = '';

    if (userStorage) {
      const user = JSON.parse(userStorage);
      userId = user.id ? user.id.toString() : '';
    }

    // 2. Creamos la cabecera con el ID del usuario
    const headers = new HttpHeaders({
      'X-User-Id': userId
    });

    // 3. Enviamos la petición con esa cabecera
    return this.http.get(this.url, { headers });
  }

  crearReserva(data: any) {
    const userStorage = localStorage.getItem('user');
    let userId = '';

    if (userStorage) {
      const user = JSON.parse(userStorage);
      userId = user.id ? user.id.toString() : '';
    }

    const headers = new HttpHeaders({
      'X-User-Id': userId
    });

    return this.http.post(this.url, data, { headers });
  }
}