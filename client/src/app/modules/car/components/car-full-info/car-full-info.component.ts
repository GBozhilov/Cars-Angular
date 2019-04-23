import { Component, Input } from '@angular/core';

import ICar from '../../../core/interfaces/ICar';

@Component({
  selector: 'app-car-full-info',
  templateUrl: './car-full-info.component.html',
  styleUrls: ['./car-full-info.component.css']
})
export class CarFullInfoComponent {
  @Input() car: ICar
}