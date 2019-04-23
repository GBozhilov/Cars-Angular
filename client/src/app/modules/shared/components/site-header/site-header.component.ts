import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements DoCheck {
  public isLogged: boolean;
  public isAdmin: boolean;
  public userEmail: string;

  constructor(
    private userService: UserService,
    private router: Router) {
    this.isLogged = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin;

    if (this.isLogged) {
      this.userEmail = localStorage.getItem('email');
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['user/login']);
  }

  ngDoCheck() {
    this.isLogged = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin;

    if (this.isLogged) {
      this.userEmail = localStorage.getItem('email');
    }
  }
}
