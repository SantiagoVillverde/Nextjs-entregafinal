import { Types } from 'mongoose';

export interface IOrderProduct {
    productId: Types.ObjectId;
    quantity: number;
}

export interface IOrder {
    _id: Types.ObjectId;
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    totalPayment: number;
    products: IOrderProduct[];
}
