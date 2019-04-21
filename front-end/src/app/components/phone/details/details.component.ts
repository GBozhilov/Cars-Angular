import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { AuthService } from "../../../core/services/authentication/auth.service";
import { PhoneService } from "../../../core/services/phone/phone.service";
import { PhoneViewModel } from "../../../core/models/view-models/phone";

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    private phone: PhoneViewModel
    constructor(
        private phoneService: PhoneService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {        
        this.route.params.subscribe(params => {
            this.phoneService.getDetails(params["id"]).subscribe(res => {                
                if (res["success"]) {
                    this.phone = res["phone"]
                } else{
                    alert(res["message"])
                }
            })
        })

    }

}