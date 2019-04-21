import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {orderRoutes} from './order.routing'
import {OrderListComponent} from './list/order-list.component';
import {AddComponent} from './add/add.component';
import {DetailsOrderComponent} from './details/details.component';
import {UpdateComponent} from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes)
  ],
  declarations: [
    OrderListComponent,
    AddComponent,
    DetailsOrderComponent,
    UpdateComponent
  ],
  exports: [],
  providers: []
})
export class OrderModule {
}
