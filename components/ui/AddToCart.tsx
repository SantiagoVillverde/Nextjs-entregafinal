"use client"
import React, {FC, useContext} from 'react'
import {MinusCircleIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {CartContext} from "@/context/CartProvider";
import useItemCount from "@/hooks/useItemCount";
import {IProductWithCategory, IProductWithCount} from "@/interfaces/IProduct";

interface AddToCartProps {
    product: IProductWithCategory;
}

const AddToCart: FC<AddToCartProps> = ({product}) => {

    const {dispatch: cartDispatch} = useContext(CartContext);
    const {count, handleSum, handleRest} = useItemCount();

    const addCart = (product: IProductWithCount) => {
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    };

    return (
        <>
            <div className="my-4">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <button onClick={() => handleRest()} disabled={count === 1} className="text-blue-300 text-sm py-1 px-2 rounded transition duration-300 hover:text-white ">
                            <MinusCircleIcon className={`h-6 w-6 ${count === 1 ? "text-gray-500" : "text-blue-300"}`}/>
                        </button>
                        <span className="mx-2 text-gray-300">{count}</span>
                        <button onClick={() => handleSum()} className="text-blue-300 text-sm py-1 px-2 rounded transition duration-300 hover:text-white">
                            <PlusCircleIcon className="h-6 w-6 text-blue-300"/>
                        </button>
                    </div>
                    <div className="flex py-4 justify-between items-center ml-2">
                        <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 shadow hover:text-white" onClick={() => addCart({...product, count})}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddToCart
