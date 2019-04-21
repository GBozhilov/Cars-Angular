import { Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

import { AdminGuard } from '../../core/guards/admin/admin.guard';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


export const phoneRoutes : Routes = [
  { path: 'add', canActivate: [ AdminGuard ], component: AddComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'delete/:id',canActivate: [ AdminGuard ], component: DeleteComponent },
  { path: 'edit/:id',canActivate: [ AdminGuard ], component: EditComponent },
  { path: 'list', component: ListComponent },

]