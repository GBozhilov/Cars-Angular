import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

import {OrderService} from '../../../core/services/order/order.service';

@Component({
  template: '',
})
export class UpdateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public orderService: OrderService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      let id = res['id'];
      let status = res['status'];

      this.orderService.updateStatus(id, status).subscribe(res => {
        if (res['success']) {
          this.toastr.success(res['message'], 'Success!');
          this.router.navigate(['/order/list'])
        } else {
          this.toastr.error(res['message'], 'Error!');
        }
      })
    })
  }
}
