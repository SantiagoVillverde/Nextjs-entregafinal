'use client'
import {FC, useContext} from "react";
import Image from "next/image";
import {XCircleIcon} from "@heroicons/react/24/solid";
import {IProduct} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import EmptyCart from "@/components/ui/EmptyCart";
import ButtonWithLink from "@/components/ui/ButtonWithLink";

const CartTable: FC = () => {

    const {cart, dispatch} = useContext(CartContext);

    const removeItemFromCart = (product: IProduct) => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART',
            payload: product
        });
    }

    if (!cart.items.length) {
        return (<EmptyCart/>)
    }

    return (
        <>
            <table className="hidden md:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">ID</th>
                    <th scope="col" className="py-3 px-6">Title</th>
                    <th scope="col" className="py-3 px-6 hidden sm:table-cell">Description</th>
                    <th scope="col" className="py-3 px-6 hidden lg:table-cell">Image</th>
                    <th scope="col" className="py-3 px-6">Price</th>
                    <th scope="col" className="py-3 px-6">Count</th>
                    <th scope="col" className="py-3 px-6">Subtotal</th>
                    <th scope="col" className="py-3 px-6">Action</th>
                </tr>
                </thead>
                <tbody>
                {cart.items && cart.items.map((product) => (
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                        <td className="py-4 px-6">{product.id}</td>
                        <td className="py-4 px-6">{product.title}</td>
                        <td className="py-4 px-6 hidden sm:table-cell">{`${product.description.substring(0, 100)}...`}</td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                            <Image
                                src={`/gamebazar/${product.image}.png`}
                                alt={`Imagen del producto: ${product.title}`}
                                width={640}
                                height={360}
                                className="w-10 h-10 rounded-full"
                                placeholder="blur"
                                blurDataURL="/loading.png"
                            />
                        </td>
                        <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                        <td className="py-4 px-6">{product.count}</td>
                        <td className="py-4 px-6">${(product.price * product.count).toFixed(2)}</td>
                        <td className="py-4 px-6">
                            <XCircleIcon title="Delete item from cart" className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer h-6 w-6' onClick={() => removeItemFromCart(product)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="text-lg text-gray-300 mt-4 text-right">
                Total Order: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span>
            </p>
            <ButtonWithLink url="/cart/checkout" text="Proceed to Checkout"/>
        </>
    );
}

export default CartTable;
