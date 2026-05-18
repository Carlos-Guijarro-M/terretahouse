import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private url = 'http://localhost:8000/api';
  private currentUser: any = null;

  constructor(private http: HttpClient) {
    this.currentUser = this.loadUserFromStorage();
  }

  login(data: any) {
    return this.http.post(`${this.url}/login`, data, {
      withCredentials: true
    });
  }

  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  getUser() {
    if (this.currentUser) {
      return this.currentUser;
    }

    this.currentUser = this.loadUserFromStorage();
    return this.currentUser;
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  logout() {
    return this.http.post(`${this.url}/logout`, {}, {
      withCredentials: true
    });
  }

  private loadUserFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }
}
