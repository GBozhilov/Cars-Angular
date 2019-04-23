import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import ICar from '../../../core/interfaces/ICar';
import { CarService } from 'src/app/modules/core/services/car.service';

@Component({
  selector: 'app-details-car',
  templateUrl: './details-car.component.html',
  styleUrls: ['./details-car.component.css']
})
export class DetailsCarComponent implements OnDestroy {
  public readonly car: ICar;
  public readonly moreCars$: Subscription;
  public cars: ICar[];

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router) {
    this.car = this.route.snapshot.data.car['car'];

    this.moreCars$ = this.carService.getAll().subscribe((cars) => {
      this.cars = cars.filter((c) => c._id !== this.car._id).slice(0, 3);
    });
  }

  refreshPage(carId) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

    const baseUrl = this.router.url.split('/').slice(0, 3).join('/');
    let currentUrl = baseUrl + '/' + carId + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  ngOnDestroy(): void {
    this.moreCars$.unsubscribe();
  }

}
