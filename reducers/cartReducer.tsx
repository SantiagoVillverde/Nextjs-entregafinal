'use client'
import {getCartFromSessionStorage, saveCartInSessionStorage} from "@/helpers/SessionStorage";
import {ICart} from "@/interfaces/ICart";
import CartAction from "@/reducers/cartReducerTypes";

const storedCart = getCartFromSessionStorage('cart');

export const cartInitialState: ICart = {
    items: storedCart ? storedCart.items : [],
    totalPayment: storedCart ? storedCart.totalPayment : 0,
};

const calculateTotalPayment = (cartItems: any[]): number => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
};

const cartReducer = (state: ICart, action: CartAction): ICart => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const checkIfItemExistInCart = state.items.some((item) => item.id === action.payload.id);
            const updatedCart = checkIfItemExistInCart
                ? state.items.map((cartItem) => cartItem.id === action.payload.id
                    ? {...cartItem, count: cartItem.count + action.payload.count}
                    : cartItem)
                : [...state.items, action.payload];
            const finalCart: ICart = {
                ...state,
                items: updatedCart,
                totalPayment: calculateTotalPayment(updatedCart),
            };
            saveCartInSessionStorage('cart', finalCart);
            return finalCart;
        case 'REMOVE_ITEM_FROM_CART':
            const newCartRemove = state.items.filter((item) => item.id !== action.payload.id);
            const finalCartRemove: ICart = {
                ...state,
                items: newCartRemove,
                totalPayment: calculateTotalPayment(newCartRemove),
            };
            saveCartInSessionStorage('cart', finalCartRemove);
            return finalCartRemove;
        case 'REMOVE_ALL_ITEMS_FROM_CART':
            saveCartInSessionStorage('cart', {items: [], totalPayment: 0});
            return {items: [], totalPayment: 0};
        default:
            return state;
    }
};

export default cartReducer;
