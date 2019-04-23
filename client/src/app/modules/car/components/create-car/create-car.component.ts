import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnDestroy {
  private carCreateStream$: Subscription;

  constructor(
    private carService: CarService,
    private router: Router
  ) {

  }

  create(carData) {
    this.carCreateStream$ = this.carService.create(carData).subscribe((responce) => {
      this.router.navigate([ '/car/all' ]);
    });
  }

  ngOnDestroy() {
    if (this.carCreateStream$) {
      this.carCreateStream$.unsubscribe();
    }
  }
}
