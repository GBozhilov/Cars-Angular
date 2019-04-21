import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CarService } from '../../../core/services/car/car.service';

@Component({
    template: '',
})
export class DeleteComponent implements OnInit {
    constructor(
        private carService: CarService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(p => {
            this.carService.deleteCar(p['id']).subscribe(res => {
                this.authService.tryNavigate()
            })
        })
    }

    ngOnInit() {        
    
    }
}
