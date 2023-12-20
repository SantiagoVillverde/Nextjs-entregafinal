import { Types } from 'mongoose';

export interface IProduct {
    _id: Types.ObjectId;
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    categoryId: Types.ObjectId;
    categoryName: string;
    stock: number;
}

export interface IProductWithCategory extends IProduct {
    categoryName: string;
}

export interface IProductWithCount extends IProduct {
    count: number;
}
