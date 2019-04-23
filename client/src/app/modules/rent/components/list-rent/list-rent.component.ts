import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { RentService } from '../../../core/services/rent.service';
import IRent from '../../../core/interfaces/IRent';

@Component({
  selector: 'app-list-rent',
  templateUrl: './list-rent.component.html',
  styleUrls: ['./list-rent.component.css']
})
export class ListRentComponent implements OnDestroy {
  public rentedCars$: Observable<IRent[]>;
  private rentStream$: Subscription;

  constructor(private rentService: RentService) { 
    this.rentedCars$ = this.rentService.getCurrentUserRents();
  }

  returnCar(rentId) {
    this.rentStream$ = this.rentService.delete(rentId).subscribe((responce) => {
      this.rentedCars$ = this.rentService.getCurrentUserRents();
    });
  }

  ngOnDestroy() {
    if (this.rentStream$) {
      this.rentStream$.unsubscribe();
    }
  }
}
