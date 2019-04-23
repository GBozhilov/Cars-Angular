import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CarService } from '../../../core/services/car.service';
import ICar from 'src/app/modules/core/interfaces/ICar';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnDestroy {
  private carEditStream$: Subscription;
  public readonly car: ICar;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.car = this.route.snapshot.data.car['car'];
  }

  edit(carData) {
    this.carEditStream$ = this.carService.edit(carData, this.car._id).subscribe((responce) => {
      this.router.navigate([ '/car/details', this.car._id ]);
    });
  }

  ngOnDestroy() {
    if (this.carEditStream$) {
      this.carEditStream$.unsubscribe();
    }
  }
}
