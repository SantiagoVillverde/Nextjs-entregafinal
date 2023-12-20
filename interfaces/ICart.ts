import {IProductWithCount} from "@/interfaces/IProduct";

export interface ICart {
    items: IProductWithCount[];
    totalPayment: number;
}

export interface ICartItem {
    id: string;
    price: number;
    count: number;
}
