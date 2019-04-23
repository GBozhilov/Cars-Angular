import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRentComponent } from './components/list-rent/list-rent.component';
import { CreateRentComponent } from './components/create-rent/create-rent.component';

import { RentCarGuard } from '../core/guards/rent-car.guard';

import { CarDetailsResolver } from '../core/resolvers/car-details.resolver';

const routes: Routes = [
    { path: 'mine', component: ListRentComponent },
    { path: 'create/:id', component: CreateRentComponent, canActivate: [ RentCarGuard ], resolve: { car: CarDetailsResolver } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RentRoutingModule { }
