import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CarService } from '../services/car.service';
import ICar from '../interfaces/ICar';

@Injectable()
export class CarDetailsResolver implements Resolve<ICar> {

    constructor(private carService: CarService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const carId = route.params['id'];

        return this.carService.getDetails(carId);
    }
}
