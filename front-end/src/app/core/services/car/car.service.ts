import {Injectable} from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {Router} from '@angular/router';
import {Subscribable} from 'rxjs';

import {CarInputModel} from '../../models/input-models/car';
import {CarViewModel} from '../../models/view-models/car';

@Injectable()
export class CarService {

  constructor(private httpService: HttpClientService) {}

  getAll(queryParams): Subscribable<Object> {
    return this.httpService.get('car/all' + queryParams, false);
  }

  getCount(queryParams): Subscribable<Number> {
    return this.httpService.get('car/count' + queryParams, false);
  }

  getDetails(id): Subscribable<CarViewModel> {
    return this.httpService.get('car/details/' + id, false);
  }

  addCar(car: CarInputModel): Subscribable<Object> {
    let id = sessionStorage.getItem('id');
    return this.httpService.post('car/create/' + id, car, true);
  }

  deleteCar(id): Subscribable<Object> {
    let userId = sessionStorage.getItem('id');
    return this.httpService.get('car/delete/' + id + '/' + userId, true);
  }

  editCar(id, body): Subscribable<Object> {
    let userId = sessionStorage.getItem('id');
    return this.httpService.post('car/edit/' + id + '/' + userId, body, true);
  }

  getNewCars(): Subscribable<Object> {
    return this.httpService.get('car/newCars', false);
  }
}
