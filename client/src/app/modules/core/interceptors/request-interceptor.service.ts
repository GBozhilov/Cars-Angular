import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isAuthenticated = this.userService.isAuthenticated();

        if (isAuthenticated) {
            const token = this.userService.token;

            req = req.clone({
                setHeaders: {
                    "Authorization": `Basic ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
