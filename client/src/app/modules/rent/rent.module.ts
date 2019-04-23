import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RentRoutingModule } from './rent-routing.module';
import { CarModule } from '../car/car.module';

import { ListRentComponent } from './components/list-rent/list-rent.component';
import { CreateRentComponent } from './components/create-rent/create-rent.component';

@NgModule({
  declarations: [
    ListRentComponent,
    CreateRentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RentRoutingModule,
    CarModule
  ]
})
export class RentModule { }
