'use client'
import {FC, useState} from "react";
import Image from "next/image";
import { PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { IProduct } from "@/interfaces/IProduct";
import { deleteProductById } from "@/services/ProductService";
import Link from "next/link";

interface IProductsTableProps {
    products: IProduct[];
}

const ProductsAdminTable: FC<IProductsTableProps> = ({ products }) => {

    const [productsList, setProductsList] = useState<IProduct[]>(products);

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProductById(productId);
            const updatedProducts = productsList.filter(product => product.id !== productId);
            setProductsList(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <table className="hidden md:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">ID</th>
                <th scope="col" className="py-3 px-6">Title</th>
                <th scope="col" className="py-3 px-6 hidden sm:table-cell">Description</th>
                <th scope="col" className="py-3 px-6 hidden lg:table-cell">Image</th>
                <th scope="col" className="py-3 px-6">Price</th>
                <th scope="col" className="py-3 px-6">Stock</th>
                <th scope="col" className="py-3 px-6">Action</th>
            </tr>
            </thead>
            <tbody>
            {productsList && productsList.map((product) => (
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
                    <td className="py-4 px-6">{product.stock}</td>
                    <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                            <Link href={`admin/products/edit/${product._id}`}><PencilIcon className="text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer h-6 w-6"/></Link>
                            <XCircleIcon className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer h-6 w-6' onClick={() => handleDeleteProduct(product.id)}/>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductsAdminTable;
