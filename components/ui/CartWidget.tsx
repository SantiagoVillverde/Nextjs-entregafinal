'use client'
import {FC, useContext} from "react";
import Link from "next/link";
import {ShoppingCartIcon} from "@heroicons/react/24/solid";
import {CartContext} from "@/context/CartProvider";

interface CartWidgetProps {
    open: boolean;
}

const CartWidget: FC<CartWidgetProps> = ({open}) => {

    const {cart} = useContext(CartContext);

    return (
        <div className='flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 relative mt-9'>
            <Link href='/cart' className='flex items-center'>
                <ShoppingCartIcon className="h-6 w-6"/>
                <span className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize ml-4`}>
                    Shopping Cart
                </span>
            </Link>
            {cart.items.length > 0 && (
                <div className='ml-2 bg-blue-700 text-white rounded-full w-4 h-4 absolute left-4 top-6'>
                    <span className='text-xs flex justify-center items-center h-full'>
                        {cart.items.length}
                    </span>
                </div>
            )}
        </div>
    )
}

export default CartWidget;
