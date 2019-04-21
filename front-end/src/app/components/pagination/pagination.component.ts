import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../core/services/car/car.service';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

const countCar = 6;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  public pages: number[];
  private page: number;
  private sub: any;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pages = []
  }

  ngOnInit() {
    this.route.queryParams.debounceTime(500).distinctUntilChanged().subscribe(p => {
      let search = p.search || '';
      this.carService.getCount(`?search=${search}`).subscribe(allCars => {
        this.pages = [];
        let cars = Math.ceil(Number(allCars['count']) / countCar);
        for (let i = 1; i <= cars; i++) {
          this.pages.push(i)
        }
      })
    });


    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 0;
      });
  }

  nextPage() {
    this.page === 0 ? this.page = 1 : this.page;
    ++this.page <= this.pages.length ? this.page : --this.page
    this.router.navigate(['car/list'], {queryParams: {page: this.page}, queryParamsHandling: 'merge'});
  }

  prevPage() {
    let baseUrl: any;
    this.route.queryParams.subscribe(res => {
      baseUrl = JSON.stringify(res)
    });
    --this.page >= 1 ? this.page : ++this.page
    this.router.navigate(['car/list' + ''], {queryParams: {page: this.page}, queryParamsHandling: 'merge'});
  }
}
