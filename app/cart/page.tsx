import {ReactElement} from "react";
import ProductsCartTable from "@/components/ui/ProductsCartTable";

export const dynamic = 'force-dynamic';

export default function Cart(): ReactElement {

    return (
        <>
            <h1 className='mb-5 text-3xl'>Shopping Cart</h1>
            <ProductsCartTable/>
        </>
    )
}
