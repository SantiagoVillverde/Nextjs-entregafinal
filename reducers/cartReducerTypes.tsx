import {IProductWithCount} from "@/interfaces/IProduct";

export interface AddToCartAction {
    type: 'ADD_TO_CART';
    payload: IProductWithCount;
}

export interface RemoveItemFromCartAction {
    type: 'REMOVE_ITEM_FROM_CART';
    payload: { id: string };
}

export interface RemoveAllItemsFromCartAction {
    type: 'REMOVE_ALL_ITEMS_FROM_CART';
}

export type CartAction =
    | AddToCartAction
    | RemoveItemFromCartAction
    | RemoveAllItemsFromCartAction;

export default CartAction;
