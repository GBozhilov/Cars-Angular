import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl
} from '@angular/forms';

import { PhoneInputModel } from "../../../core/models/input-models/phone";
import { AuthService } from "../../../core/services/authentication/auth.service";
import { PhoneService } from "../../../core/services/phone/phone.service";
import { ToastsManager } from "ng2-toastr";

@Component({
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    private phone: PhoneInputModel
    public model: FormGroup;
    public addFail: boolean;

    public brandMsg: string
    public modelMsg: string
    public imgMsg: string
    public priceMsg: string
    constructor(
        private phoneService: PhoneService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
      
    }

    edit() {
        this.phone = new PhoneInputModel(
            this.model.value.brand,
            this.model.value.description,
            this.model.value.imgUrl,
            this.model.value.model,
            this.model.value.price,
        )
        this.route.params.subscribe(p => {
            this.phoneService.editPhone(p.id, this.phone).subscribe(res => {
                this.authService.redirectUrl = 'phone/details/' + p.id
                this.authService.tryNavigate()
            })            
        })
    }

    ngOnInit() {      
        const imgUrlRegex: string = `(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`
        this.model = this.fb.group({
            brand: ['', [Validators.required, Validators.maxLength(30)]],
            model: ['', [Validators.required, Validators.maxLength(30)]],
            imgUrl: ['', [Validators.required, Validators.pattern(new RegExp(imgUrlRegex))]],
            price: ['', [Validators.required]],
            description: ['', []]
        })

        this.route.params.subscribe(params => {
            this.phoneService.getDetails(params["id"]).subscribe(res => {
                if (res["success"]) {
                    this.phone = res["phone"]
                    this.model.get('brand').setValue(this.phone.brand)
                    this.model.get('model').setValue(this.phone.model)
                    this.model.get('price').setValue(this.phone.price)
                    this.model.get('imgUrl').setValue(this.phone.imgUrl)
                    this.model.get('description').setValue(this.phone.description)
                } else {
                    alert(res["message"])
                }
            })
        })
        

        this.addValidator.brandControl()
        this.addValidator.modelControl()
        this.addValidator.imgControl()
        this.addValidator.priceControl()

        this.onChanges()
    }

    onChanges() {
        this.model.statusChanges.subscribe(value => {
            this.addFail = value === 'VALID' && this.model.dirty
        })
    }
    
    addValidator = {
        brandControl: () => {
            const brandControl = this.model.get('brand')
            brandControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.brandMsg = (brandControl.touched || brandControl.dirty) && brandControl.errors ?
                        Object.keys(brandControl.errors)[0] : ''
                })
        },
        modelControl: () => {
            const modelControl = this.model.get('model')
            modelControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.modelMsg = (modelControl.touched || modelControl.dirty) && modelControl.errors ?
                        Object.keys(modelControl.errors)[0] : ''
                })
        },
        imgControl: () => {
            const imgControl = this.model.get('imgUrl')
            imgControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.imgMsg = (imgControl.touched || imgControl.dirty) && imgControl.errors ?
                        Object.keys(imgControl.errors)[0] : ''
                })
        },
        priceControl: () => {
            const priceControl = this.model.get('price')
            priceControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.priceMsg = (priceControl.touched || priceControl.dirty) && priceControl.errors ?
                        Object.keys(priceControl.errors)[0] : ''
                })
        },
    }

}