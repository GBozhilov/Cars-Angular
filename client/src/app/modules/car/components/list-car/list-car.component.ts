import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CarService } from '../../../core/services/car.service';
import { UserService } from '../../../core/services/user.service';
import ICar from '../../../core/interfaces/ICar';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {
  public cars$: Observable<ICar[]>;
  public readonly isLogged: boolean;
  public readonly isAdmin: boolean;

  constructor(
    private carService: CarService,
    private userService: UserService) { 
    this.cars$ = this.carService.getAll();
    this.isLogged = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin;
  }

  ngOnInit() {
  }

}
