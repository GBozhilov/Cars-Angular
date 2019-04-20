import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {ServiceModule} from './core/services/service.module';
import {GuardsModule} from './core/guards/guards.module';
import {SharedModule} from './components/sheard/shared.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LogoutComponent} from './components/auth/logout/logout';
import {RegisterComponent} from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    HttpClientModule,
    SharedModule,
    GuardsModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
