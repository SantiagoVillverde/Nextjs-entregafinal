import {FC} from "react";
import type {Metadata, ResolvingMetadata} from 'next';
import {IProductWithCategory} from "@/interfaces/IProduct";
import {getProductById} from "@/services/ProductService";
import ProductCardDetail from "@/components/ui/ProductCardDetail";

export const dynamic = 'force-dynamic';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const {id} = params;
    const product: IProductWithCategory | undefined  = await getProductById(id);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "The requested product does not exist in our database.",
        };
    }
    return {
        title: product.title,
        description: product.description,
    }
}

interface ProductDetailProps {
    params: {
        id: string;
    };
}

const ProductDetailPage: FC<ProductDetailProps> = async ({params}) => {

    const {id} = params;
    const product: IProductWithCategory = await getProductById(id);

    if (!product) {
        return <div className="text-center text-xl text-red-500 p-5">Product Not Found</div>;
    }

    return (
        <div className="container mx-auto mt-10 md:p-5">
            <ProductCardDetail product={product} />
        </div>
    );
};

export default ProductDetailPage;
