import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reserva {

  private url = 'http://localhost:8000/api/reservas';

  constructor(private http: HttpClient) { }

  getReservas(userId: number) {
    return this.http.get(`${this.url}?userId=${userId}`, {
      withCredentials: true
    });
  }

  crearReserva(data: any) {
    return this.http.post(this.url, data, {
      withCredentials: true
    });
  }
}