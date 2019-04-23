import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCarComponent } from './components/list-car/list-car.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { DeleteCarComponent } from './components/delete-car/delete-car.component';
import { DetailsCarComponent } from './components/details-car/details-car.component';

import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';

import { CarDetailsReslover } from '../core/resolvers/car-details.resolver';

const routes: Routes = [
    { path: 'all', component: ListCarComponent },
    { path: 'create', component: CreateCarComponent, canActivate: [ AuthGuard, AdminGuard ] },
    { path: 'edit/:id', component: EditCarComponent, canActivate: [ AuthGuard, AdminGuard ], resolve: { car: CarDetailsReslover } },
    { path: 'delete/:id', component: DeleteCarComponent, canActivate: [ AuthGuard, AdminGuard ], resolve: { car: CarDetailsReslover } },
    { path: 'details/:id', component: DetailsCarComponent, resolve: { car: CarDetailsReslover } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule { }