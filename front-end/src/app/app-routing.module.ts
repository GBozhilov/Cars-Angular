import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/sheard/not-found/not-found.component';
import {LogoutComponent} from './components/auth/logout/logout';
import {AuthGuard} from './core/guards/authentication/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'car', loadChildren: 'app/components/car/car.module#CarModule'},
  {path: 'order', canActivate: [AuthGuard], loadChildren: 'app/components/order/order.module#OrderModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
