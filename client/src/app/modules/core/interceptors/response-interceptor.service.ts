import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

    constructor(public toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((res) => {
                if (res instanceof HttpResponse) {
                    const message = res.body['message'];

                    if (res.url.includes('details')) {
                        return;
                    }

                    if (message) {
                        this.toastr.success(message);
                    }
                }
            }),
            catchError((res) => {
                const messages = new Set();

                res['error']['errors'].forEach((error) => {
                    messages.add(error['msg']);
                });

                messages.forEach((message) => {
                    this.toastr.error(message);
                });
                
                throw res;
            })
        );
    }
}
