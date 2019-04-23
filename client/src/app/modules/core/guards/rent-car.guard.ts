import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { CarService } from '../services/car.service';

@Injectable()
export class RentCarGuard implements CanActivate {
    constructor(
        private carService: CarService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const carId = state.url.split('/').pop();

        return this.carService.getDetails(carId).pipe(
            map(car => {
                if(!car['car'].isRented) {
                  return true;
                } else {
                  this.router.navigate([ 'car/all' ]);
                  return false;
                }
              })
        );
    }
}