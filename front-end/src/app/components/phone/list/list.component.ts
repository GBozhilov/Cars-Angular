import { Component, OnInit } from "@angular/core";
import { PhoneService } from "../../../core/services/phone/phone.service";
import { PhoneViewModel } from "../../../core/models/view-models/phone";
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public phones: PhoneViewModel[]
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private phoneService: PhoneService
    ) {
    }

    ngOnInit() {
        this.route.queryParams.debounceTime(500).distinctUntilChanged().subscribe(p => {
            let serach = p.serach || ''
            let page = p.page || ''
            this.phoneService.getAll(`?serach=${serach}&page=${page}`)
            .subscribe(res => {
                this.phones = res["phones"]    
            })
        })
        // console.log(this.route.queryParamMap)
        
    }

    getPhones(search) {
        this.router.navigate(['phone/list'], { queryParams: { serach: search.target.value } });
    }
}