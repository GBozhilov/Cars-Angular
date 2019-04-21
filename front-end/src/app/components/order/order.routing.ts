import {Routes} from '@angular/router';

import {AdminGuard} from '../../core/guards/admin/admin.guard';
import {OrderListComponent} from './list/order-list.component';
import {AddComponent} from './add/add.component';
import {DetailsOrderComponent} from './details/details.component';
import {UpdateComponent} from './update/update.component';

export const orderRoutes: Routes = [
  {path: 'list', component: OrderListComponent},
  {path: 'add/:id', component: AddComponent},
  {path: 'details/:id', component: DetailsOrderComponent},
  {path: 'update/:id/:status', canActivate: [AdminGuard], component: UpdateComponent},
];
