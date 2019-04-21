import {Component, OnInit} from '@angular/core';

import {OrderService} from '../../../core/services/order/order.service';
import {AuthService} from '../../../core/services/authentication/auth.service';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orders: Object[];

  constructor(
    public orderService: OrderService,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(o => {
      o['purchase'].forEach((e, i) => e['classOrder'] = i % 2 === 0 ? 'info' : 'warning');
      this.orders = o['purchase'];
      this.authService.isAdmin() && this.orders.map(o => o['status'] = o['status'].split(','));
    })
  }
}
