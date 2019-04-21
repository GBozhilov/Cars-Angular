import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../../../core/services/authentication/auth.service';
import {OrderService} from '../../../core/services/order/order.service';

@Component({
  template: '',
})
export class AddComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public orderService: OrderService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.orderService.addOrder(res['id']).subscribe(resOrder => {
        if (resOrder['success']) {
          this.router.navigate([`order/list`]);
        } else {
          alert(resOrder['message']);
        }
      })
    })
  }


}
