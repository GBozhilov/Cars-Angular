import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import imageUrlValidator from '../../../core/validators/imageUrl.validator';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  public form: FormGroup;
  public fields;

  @Input() formName: string;
  @Input() car: any;
  @Input() isDisabled: Boolean;

  @Output() onSubmitForm = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (!this.car) {
      this.car = {
        model: '',
        horsePower: '',
        engineType: '',
        fuelCapacity: '',
        transmission: '',
        kilometersTraveld: '',
        description: '',
        imageUrl: '',
        priceForDayRent: ''
      }
    }

    this.form = this.formBuilder.group({
      model: [{ value: this.car['model'], disabled: this.isDisabled }, [ Validators.required ]],
      horsePower: [{ value: this.car['horsePower'], disabled: this.isDisabled }, [ Validators.required, Validators.min(0.1) ]],
      engineType: [{ value: this.car['engineType'], disabled: this.isDisabled }, [] ],
      fuelCapacity: [{ value: this.car['fuelCapacity'], disabled: this.isDisabled }, [ Validators.required, Validators.min(0.1) ]],
      transmission: [{ value: this.car['transmission'], disabled: this.isDisabled }, [] ],
      kilometersTraveld: [{ value: this.car['kilometersTraveld'], disabled: this.isDisabled }, [ Validators.required, Validators.min(0.1) ]],
      description: [{ value: this.car['description'], disabled: this.isDisabled }, [ ]],
      imageUrl: [{ value: this.car['imageUrl'], disabled: this.isDisabled }, [ Validators.required, imageUrlValidator ]],
      priceForDayRent: [{ value: this.car['priceForDayRent'], disabled: this.isDisabled }, [ Validators.required, Validators.min(0.1) ]]
    });

    this.fields = this.form.controls;
  }

  submit() {
    this.onSubmitForm.emit(this.form.value);
    this.form.reset();
  }
}
