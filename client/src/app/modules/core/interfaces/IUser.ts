import ICar from './ICar';

interface IUser {
    _id: string;
    email: string;
    roles: string[];
    isBlocked: boolean;
    rentedCars: ICar[];
}

export default IUser;