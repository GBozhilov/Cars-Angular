import IUser from './IUser';
import ICar from './ICar';

interface IRent {
    _id: string;
    user: IUser;
    car: ICar;
    days: number;
}

export default IRent;