'use client'
import {FC, useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import {PlusCircleIcon, MinusCircleIcon} from "@heroicons/react/24/solid";
import {IProduct, IProductWithCount} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import useItemCount from "@/hooks/useItemCount";

interface ProductCardProps {
    product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({product}) => {

    const { dispatch: cartDispatch } = useContext(CartContext);
    const {count, handleSum, handleRest} = useItemCount();

    const addCart = (product: IProductWithCount) => {
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    }

    const maxLength = 100;
    const descriptionShort = product.description.length > maxLength ? `${product.description.substring(0, maxLength)}...` : product.description;

    return (
        <div className="bg-stone-900 bg-opacity-90 shadow rounded-lg p-4 min-w-[300px] max-w-[400px] w-full mt-4 md:mt-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Link href={`/detail/${product._id}`} className="transition duration-300 hover:text-blue-600" role="link">
                <Image
                    src={`/gamebazar/${product.image}.png`}
                    alt={`Imagen del producto: ${product.title}`}
                    width={640}
                    height={360}
                    className="max-w-full h-auto rounded-lg"
                    placeholder = "blur"
                    blurDataURL="/loading.png"
                />
            </Link>
            <div className="px-1 py-2">
                <div className={"flex justify-between items-center mb-3"}>
                    <h2 className="text-lg text-blue-300">
                        <Link href={`/detail/${product.id}`} className="transition duration-300 hover:text-blue-600" role="link">
                            {product.title}
                        </Link>
                    </h2>

                    <Link href={`/category/${product.categoryName}`}
                        className="uppercase px-2 py-1 bg-blue-200 text-blue-900 text-sm font-semibold rounded-full transition duration-300 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        role="link">
                        {product.categoryName}
                    </Link>
                </div>
                <p className="text-white-700 mb-4 text-sm">{descriptionShort}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => handleRest()} color="secondary" disabled={count === 1}>
                            <MinusCircleIcon className={`h-6 w-6 ${count === 1 ? "text-gray-500" : "text-blue-300"}`}/>
                        </button>
                        <span className="mx-2">{count}</span>
                        <button onClick={() => handleSum()} color="secondary">
                            <PlusCircleIcon className="h-6 w-6 text-blue-300"/>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-300 text-lg font-bold ml-2">${product.price}</p>
                    </div>
                </div>
                <div>
                    <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 shadow hover:text-white"
                        onClick={() => addCart({...product, count})}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
