'use client'
import {FC, useContext} from "react";
import {CartContext} from "@/context/CartProvider";
import Image from "next/image";

const CartPreview: FC = () => {
    const {cart} = useContext(CartContext);

    return (
        <div className="bg-black p-4 text-white">
            <h3 className="mb-10 text-lg">Cart Preview</h3>
            <ul className="space-y-4">
                {cart.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center space-x-1">
                            <Image
                                src={`/gamebazar/${item.image}.png`}
                                alt={`Imagen del producto: ${item.title}`}
                                width={640}
                                height={360}
                                className="w-10 h-10 rounded-full"
                                placeholder="blur"
                                blurDataURL="/loading.png"
                            />
                            <span className="text-gray-300 px-1">{item.title}</span>
                        </div>
                        <span className="text-gray-500 px-1 text-right">Qty: {item.count}</span>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-6 border-t border-gray-700 pt-4">
                <span className="text-gray-300 font-semibold">Total:</span>
                <span className="text-gray-300 font-semibold">${cart.totalPayment.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default CartPreview;
