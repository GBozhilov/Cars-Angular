import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createRentUrl, deleteRentUrl, getMineRentUrl } from './database';
import IRent from '../interfaces/IRent';

@Injectable()
export class RentService {
  constructor(private http: HttpClient) { }

  create(data: Object, carId: string) {
    return this.http.post(createRentUrl(carId), data);
  }

  delete(id: string) {
    return this.http.delete(deleteRentUrl(id));
  }

  getCurrentUserRents() {
    return this.http.get<IRent[]>(getMineRentUrl);
  }
}