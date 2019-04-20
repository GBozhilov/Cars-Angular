import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from '../../services/authentication/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIsAdmin(state.url);
  }

  checkIsAdmin(url: string) {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['']);
    return false;
  }
}
