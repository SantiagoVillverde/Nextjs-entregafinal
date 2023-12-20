'use client'
import Image from "next/image";
import {XCircleIcon, PencilIcon} from "@heroicons/react/24/solid";
import {FC, useContext} from "react";
import {IProduct} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import {IProductTable} from "@/interfaces/IProductTable";

const ProductsTableCard:FC<IProductTable> = ({action, context, products}) => {

    const {dispatch} = useContext(CartContext);

    const removeItemFromCart = (product: IProduct) => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART',
            payload: product
        });
    }

    return (
        <>
            <div className="sm:hidden">
                {products && products.map((product) => (
                    <div key={product.id} className="bg-white text-gray-800 dark:text-gray-500 rounded-lg mt-5 shadow-2xl border-1 border-black">
                        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-t-lg mb-1">
                            <div><strong>ID {product.id}</strong> - {product.title}</div>
                            <Image
                                src={`/gamebazar/${product.image}`}
                                alt={`Imagen del producto: ${product.title}`}
                                width={640}
                                height={360}
                                className="w-20 h-20 rounded-full"
                                placeholder = "blur"
                                blurDataURL="/loading.png"
                            />
                        </div>
                        <div className="p-2">
                            <strong>Description:</strong> {`${product.description.substring(0, 50)}...`}
                        </div>
                        <div className="p-2"><strong>Price:</strong> ${product.price.toFixed(2)}</div>
                        <div className="p-2"><strong>Category ID:</strong> {product.categoryId.toString()}</div>
                        <div className="flex justify-between p-2">
                            <div><strong>Category Name:</strong> {product.categoryName} </div>
                            {action === 'remove' ?
                                (<XCircleIcon className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer' onClick={() => removeItemFromCart(product)}/>) :
                                (<PencilIcon className="text-blue-300 hover:text-blue-700 transition duration-300"/>)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductsTableCard;
