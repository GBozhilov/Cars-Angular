import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-site-main-navigation',
  templateUrl: './site-main-navigation.component.html',
  styleUrls: ['./site-main-navigation.component.css']
})
export class SiteMainNavigationComponent {
  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  @Input('userEmail') email: string;
  @Output() logoutEmitter = new EventEmitter<void>();

  logoutUser() {
    this.logoutEmitter.emit();
  }
}
