import {CarViewModel} from './car';

export class OrderViewModel {
  constructor(
    public car: CarViewModel,
    public date: Date,
    public status: string,
  ) {}
}
