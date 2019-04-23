import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class AnonymousModuleGuard implements CanLoad {

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isAuthenticated()) {
        return true;
      }  
  
      this.router.navigate(['car/all']);
      
      return false;
  }
}