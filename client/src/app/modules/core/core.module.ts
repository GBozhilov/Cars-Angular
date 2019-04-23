import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptorService } from './interceptors/request-interceptor.service';
import { ResponceInterceptorService } from './interceptors/responce-interceptor.service';

import { AnonymousModuleGuard } from './guards/anonymous-module.guard';
import { AuthModuleGuard } from './guards/auth-module.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RentCarGuard } from './guards/rent-car.guard';

import { UserService } from './services/user.service';
import { CarService } from './services/car.service';
import { RentService } from './services/rent.service';

import { CarDetailsReslover } from './resolvers/car-details.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponceInterceptorService,
      multi: true
    },
    AnonymousModuleGuard,
    AuthModuleGuard,
    AuthGuard,
    AdminGuard,
    RentCarGuard,
    UserService,
    CarService,
    RentService,
    CarDetailsReslover,
  ],
  exports: [ ]
})
export class CoreModule { }
