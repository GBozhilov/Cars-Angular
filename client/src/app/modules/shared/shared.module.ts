import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SiteComponent } from './components/site/site.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteMainNavigationComponent } from './components/site-main-navigation/site-main-navigation.component';

@NgModule({
  declarations: [
    SiteComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteMainNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SiteComponent
  ]
})
export class SharedModule { }
