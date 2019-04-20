import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subscribable} from 'rxjs';

import {LoginModel} from '../../models/input-models/login.model';
import {HttpClientService} from '../http-client.service';
import {RegisterModel} from '../../models/input-models/register-model';

@Injectable()
export class AuthService {
  public redirectUrl: string;
  public username: string;

  constructor(
    private httpService: HttpClientService,
    private router: Router,
  ) {

  }

  login(loginModel: LoginModel): Subscribable<Object> {
    return this.httpService.post('auth/login', loginModel, false);
  }

  register(registerModel: RegisterModel): Subscribable<Object> {
    return this.httpService.post('auth/signup', registerModel, false);
  }

  logout(): void {
    this.httpService.get('auth/logout', false);
    sessionStorage.clear();
    this.username = '';
    this.redirectUrl = '';
    this.tryNavigate();
    this.redirectUrl = ''

  }

  isCommentOwner(id): boolean {
    return sessionStorage.getItem('id') === id || this.isAdmin();
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('authtoken') === null;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'Admin';
  }

  tryNavigate() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
