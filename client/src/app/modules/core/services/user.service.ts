import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { registerUrl, loginUrl, getCurrentUserUrl } from './database';
import IUser from '../interfaces/IUser';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token');
  }

  get isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  register(data: Object) {
    return this.http.post(registerUrl, data);
  }

  login(data: Object) {
    return this.http.post(loginUrl, data);
  }

  getCurrentUser() {
    return this.http.get<IUser>(getCurrentUserUrl);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.token !== null;
  }

  saveUserData(userToken: string, isAdmin, email) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('email', email);
  }
}
