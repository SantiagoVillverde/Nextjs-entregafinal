import {FC} from "react";
import {IProductWithCategory} from "@/interfaces/IProduct";
import ProductCard from "@/components/ui/ProductCard";

interface ProductsContainerProps {
    products: IProductWithCategory[];
}

const ProductsList: FC<ProductsContainerProps> = ({products}) => {

    return (
        <div className="flex flex-wrap justify-center p-1 md:p-4 md:gap-4 ">
            {products.map((product: IProductWithCategory) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};

export default ProductsList;
