import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponceInterceptorService implements HttpInterceptor {

    constructor(public toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((responce) => {
                if (responce instanceof HttpResponse) {
                    const message = responce.body['message'];

                    if (responce.url.includes('details')) {
                        return;
                    }

                    if (message) {
                        this.toastr.success(message);
                    }
                }
            }),
            catchError((responce) => {
                const messages = new Set();

                responce['error']['errors'].forEach((error) => {
                    messages.add(error['msg']);
                });

                messages.forEach((message) => {
                    this.toastr.error(message);
                });
                
                throw responce;
            })
        );
    }
}
