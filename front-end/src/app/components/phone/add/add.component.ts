import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';

import {CarService} from '../../../core/services/car/car.service';
import {CarInputModel} from '../../../core/models/input-models/car';
import {AuthService} from '../../../core/services/authentication/auth.service';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private car: CarInputModel;
  public model: FormGroup;
  public addFail: boolean;

  public brandMsg: string;
  public modelMsg: string;
  public imgMsg: string;
  public priceMsg: string;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    const imgUrlRegex: string = `(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`;

    this.model = this.fb.group({
      brand: ['', [Validators.required, Validators.maxLength(30)]],
      model: ['', [Validators.required, Validators.maxLength(30)]],
      imgUrl: ['', [Validators.required, Validators.pattern(new RegExp(imgUrlRegex))]],
      price: ['', [Validators.required]],
      description: ['', []]
    });

    this.addValidator.brandControl();
    this.addValidator.modelControl();
    this.addValidator.imgControl();
    this.addValidator.priceControl();

    this.onChanges()
  }

  add() {
    this.car = new CarInputModel(
      this.model.value.brand,
      this.model.value.description,
      this.model.value.imgUrl,
      this.model.value.model,
      this.model.value.price,
    );
    this.carService.addCar(this.car).subscribe(res => {
      if (res['success']) {
        this.authService.tryNavigate();
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    }, err => {
      this.toastr.error('Unauthorized.', 'Error!');
    })
  }

  onChanges() {
    this.model.statusChanges.subscribe(value => {
      this.addFail = value === 'VALID';
    })
  }

  addValidator = {
    brandControl: () => {
      const brandControl = this.model.get('brand');
      brandControl.valueChanges
        .debounceTime(500)
        .subscribe(value => {
          this.brandMsg = (brandControl.touched || brandControl.dirty) && brandControl.errors ?
            Object.keys(brandControl.errors)[0] : ''
        })
    },
    modelControl: () => {
      const modelControl = this.model.get('model');
      modelControl.valueChanges
        .debounceTime(500)
        .subscribe(value => {
          this.modelMsg = (modelControl.touched || modelControl.dirty) && modelControl.errors ?
            Object.keys(modelControl.errors)[0] : ''
        })
    },
    imgControl: () => {
      const imgControl = this.model.get('imgUrl');
      imgControl.valueChanges
        .debounceTime(500)
        .subscribe(value => {
          this.imgMsg = (imgControl.touched || imgControl.dirty) && imgControl.errors ?
            Object.keys(imgControl.errors)[0] : ''
        })
    },
    priceControl: () => {
      const priceControl = this.model.get('price');
      priceControl.valueChanges
        .debounceTime(500)
        .subscribe(value => {
          this.priceMsg = (priceControl.touched || priceControl.dirty) && priceControl.errors ?
            Object.keys(priceControl.errors)[0] : ''
        })
    },
  }

}
