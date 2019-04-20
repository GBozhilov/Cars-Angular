import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {allServices} from './index';
import {ToastModule} from 'ng2-toastr';

@NgModule({
  providers: [
    ...allServices
  ],
  imports: [
    CommonModule,
    ToastModule.forRoot(),
  ]
})
export class ServiceModule {
}
