import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(data: any) {
  return this.http.post('http://localhost:8000/api/login', data, {
    withCredentials: true
  });
}

  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

  logout() {
    return this.http.post(`${this.url}/logout`, {}, {
      withCredentials: true
    });
  }
}