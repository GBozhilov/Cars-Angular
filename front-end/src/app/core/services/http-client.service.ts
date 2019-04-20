import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Observable, throwError} from 'rxjs';

const baseURL = 'http://localhost:5000/';

@Injectable()
export class HttpClientService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private authHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${sessionStorage.getItem('authtoken')}`
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastsManager
  ) {
  }

  public get<T>(url: string, auth: boolean) {
    return this.http
      .get<T>(baseURL + url, {headers: auth ? this.authHeaders : this.headers})
      .pipe(catchError(err => this.handleError(err)))
  }

  public post<T>(url: string, body: any, auth: boolean) {
    return this.http
      .post<T>(baseURL + url, body, {headers: auth ? this.authHeaders : this.headers})
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  public put<T>(url: string, body: any, auth: boolean) {
    return this.http
      .put<T>(url, body, {headers: auth ? this.authHeaders : this.headers})
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  public delete<T>(url: string, id: number, auth: boolean) {
    return this.http
      .delete<T>(`${url}/${id}`, {headers: auth ? this.authHeaders : this.headers})
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  private handleError(error: any) {
    if (error.status) {
      if (error.status === 404) {
        this.toastr.error('Page Not Found', '404')
      }
    }

    return throwError(error.message);
  }
}
