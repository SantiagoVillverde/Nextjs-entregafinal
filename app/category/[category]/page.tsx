import {FC, Suspense} from "react";
import type {Metadata} from 'next'
import {IProduct} from "@/interfaces/IProduct";
import {getProductByCategory} from "@/services/ProductService";
import ProductsList from "@/components/ui/ProductsList";
import Loader from "@/components/ui/Loader";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Products by Category',
    description: 'Products filtered by category',
}

interface ProductCategoryProps {
    params: {
        category: number | string;
    };
}

const ProductCategory: FC<ProductCategoryProps> = async ({params}) => {

    const {category} = params;

    const filteredProducts: IProduct[] = await getProductByCategory(category);

    if (!filteredProducts.length) {
        return <div>Products Not Found</div>;
    }

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <ProductsList products={filteredProducts}/>
            </Suspense>
        </>
    )
};

export default ProductCategory;
