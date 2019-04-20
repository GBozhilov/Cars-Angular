import {Injectable} from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {Subscribable} from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private httpService: HttpClientService) {
  }

  addOrder(carId): Subscribable<Object> {
    let userId = sessionStorage.getItem('id');
    return this.httpService.post(`purchase/create/${carId}/${userId}`, {}, true);
  }

  getDetails(carId): Subscribable<Object> {
    return this.httpService.get(`purchase/details/${carId}`, true);
  }

  getAllOrders(): Subscribable<Object> {
    let userId = sessionStorage.getItem('id');
    return this.httpService.get(`purchase/status/${userId}`, true);
  }

  updateStatus(id, status) {
    let userId = sessionStorage.getItem('id');
    return this.httpService.post(`purchase/status/${id}/${userId}`, {status}, true);
  }
}
