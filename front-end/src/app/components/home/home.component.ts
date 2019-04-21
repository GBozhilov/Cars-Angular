import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/authentication/auth.service';
import { CarViewModel } from '../../core/models/view-models/car';
import { CarService } from '../../core/services/car/car.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public newCar: CarViewModel[];
    public showCar: boolean;
    constructor(
        public authService: AuthService,
        public carService: CarService,
    ) {}

    ngOnInit() {
        this.carService.getNewCars().subscribe(res => {
            if (res['success']) {
            this.newCar = res['cars'];
            this.showCar = this.newCar.length === 3
            } else {
                alert(res['message']);
            }
        })     
    }
}
