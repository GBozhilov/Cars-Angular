import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CarService } from '../../../core/services/car.service';
import ICar from 'src/app/modules/core/interfaces/ICar';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.css']
})
export class DeleteCarComponent implements OnDestroy {
  private carDeleteStream$: Subscription;
  public readonly car: ICar;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.car = this.route.snapshot.data.car['car'];
  }

  delete() {
    debugger;
    this.carDeleteStream$ = this.carService.delete(this.car._id).subscribe((responce) => {
      this.router.navigate([ '/car/all' ]);
    });
  }

  ngOnDestroy() {
    if (this.carDeleteStream$) {
      this.carDeleteStream$.unsubscribe();
    }
  }
}
