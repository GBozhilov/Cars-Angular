import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CarRoutingModule } from './car-routing.module';

import { ListCarComponent } from './components/list-car/list-car.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { DeleteCarComponent } from './components/delete-car/delete-car.component';
import { DetailsCarComponent } from './components/details-car/details-car.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarFullInfoComponent } from './components/car-full-info/car-full-info.component';

@NgModule({
  declarations: [
    ListCarComponent,
    CreateCarComponent,
    EditCarComponent,
    DeleteCarComponent,
    DetailsCarComponent,
    CarFormComponent,
    CarFullInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarRoutingModule
  ],
  exports: [
    CarFullInfoComponent
  ]
})
export class CarModule { }

