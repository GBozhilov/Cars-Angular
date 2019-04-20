import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminGuard} from './admin/admin.guard';
import {AuthGuard} from './authentication/auth.guard';

@NgModule({
  providers: [
    AdminGuard,
    AuthGuard
  ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule {
}
