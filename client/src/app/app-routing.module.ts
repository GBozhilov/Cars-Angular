import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthModuleGuard} from './modules/core/guards/auth-module.guard';
import {AnonymousModuleGuard} from './modules/core/guards/anonymous-module.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/car/all'},
  {path: 'user', loadChildren: './modules/user/user.module#UserModule', canLoad: [AnonymousModuleGuard]},
  {path: 'car', loadChildren: './modules/car/car.module#CarModule'},
  {path: 'rent', loadChildren: './modules/rent/rent.module#RentModule', canLoad: [AuthModuleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
