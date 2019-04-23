import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RentService } from '../../../core/services/rent.service';
import ICar from '../../../core/interfaces/ICar';

@Component({
  selector: 'app-create-rent',
  templateUrl: './create-rent.component.html',
  styleUrls: ['./create-rent.component.css']
})
export class CreateRentComponent implements OnDestroy {
  private createRentStream$: Subscription;
  public form: FormGroup;
  public readonly fields;
  public car: ICar

  constructor(
    private formBuilder: FormBuilder,
    private rentService: RentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.car = this.route.snapshot.data.car['car'];

    this.form = this.formBuilder.group({
      days: ['', [Validators.required, Validators.min(1) ]],
    });

    this.fields = this.form.controls;
  }

  rent() {
    const rentData = this.form.value;
    this.createRentStream$ = this.rentService.create(rentData, this.car._id).subscribe((responce) => {
      this.form.reset();
      this.router.navigate([ '/rent/mine' ]);
    });
  }

  ngOnDestroy() {
    if (this.createRentStream$) {
      this.createRentStream$.unsubscribe();
    }
  }
}
