import IUser from './IUser';

interface ICar {
    _id: string;
    model: string;
    horsePower: number;
    engineType: string;
    fuelCapacity: number;
    transmission: string;
    kilometersTraveld: number;
    description: string;
    imageUrl: string;
    priceForDayRent: number;
    rentedBy: IUser
    isRented: boolean;
    counterRents: number;
}

export default ICar;