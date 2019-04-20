export class CarViewModel {
  constructor(
    public brand: string,
    public comments: Object[],
    public date: Date,
    public description: string,
    public imgUrl: string,
    public model: string,
    public price: number,
  ) {
  }
}
