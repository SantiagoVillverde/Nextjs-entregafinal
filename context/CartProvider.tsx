'use client'
import React, {createContext, Dispatch, FC, ReactNode, useReducer} from 'react';
import cartReducer, {cartInitialState} from "@/reducers/cartReducer";
import {CartAction} from "@/reducers/cartReducerTypes";
import {ICart} from "@/interfaces/ICart";

interface CartContextType {
    cart: ICart;
    dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType>({
    cart: cartInitialState,
    dispatch: () => {}
});

interface CartProviderProps {
    children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    return (
        <CartContext.Provider value={{cart: state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
