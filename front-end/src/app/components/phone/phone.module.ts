import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

import {phoneRoutes} from './phone.routing'
import { CommentComponent } from '../comment/add-comment/comment.component';
import { CommentListComponent } from '../comment/list-comment/list.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from '../pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(phoneRoutes)
    
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    CommentComponent,
    CommentListComponent,
    DeleteComponent,
    EditComponent,
    ListComponent,
    PaginationComponent
    
  ],
  exports: [],
  providers: []
})
export class PhoneModule { }
