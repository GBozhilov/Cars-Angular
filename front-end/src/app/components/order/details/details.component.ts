import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

import {AuthService} from '../../../core/services/authentication/auth.service';
import {OrderService} from '../../../core/services/order/order.service';
import {OrderViewModel} from '../../../core/models/view-models/order';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsOrderComponent implements OnInit {
  public order: OrderViewModel;
  public statusOrderClass: string;
  public status: string[];

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public orderService: OrderService,
  ) {
    this.status = ['Accepted', 'In Progress', 'Shipped', 'Delivered', 'Completed'];
    this.statusOrderClass = `order-status-timeline-completion c0`;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderService.getDetails(params['id']).subscribe(res => {
        if (res['success']) {
          this.order = res['purchase'];
          this.statusOrderClass =
            `order-status-timeline-completion c${this.status.indexOf(this.order['status'])}`
        } else {
          alert([res['message']]);
        }
      })
    })
  }
}
