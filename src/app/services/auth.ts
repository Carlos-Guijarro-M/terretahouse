import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private url = 'http://localhost:8000/api';
  private currentUser: any = null;

  constructor(private http: HttpClient) {
    // Al arrancar la app, intentamos recuperar el usuario si ya estaba logueado
    this.currentUser = this.loadUserFromStorage();
  }

  // Envía los datos del formulario al backend para iniciar sesión
  login(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }

  // Envía los datos al backend para crear un nuevo usuario
  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  // Devuelve el usuario actual que está usando la aplicación
  getUser() {
    if (!this.currentUser) {
      this.currentUser = this.loadUserFromStorage();
    }
    return this.currentUser;
  }

  // Guarda el usuario en la memoria del componente y de forma persistente en el navegador
  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Borra el usuario de la memoria al cerrar sesión
  clearUser() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  // Avisa al backend de que el usuario ha cerrado sesión
  logout() {
    return this.http.post(`${this.url}/logout`, {});
  }

  // Método privado auxiliar para leer el localStorage de forma segura
  private loadUserFromStorage() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}