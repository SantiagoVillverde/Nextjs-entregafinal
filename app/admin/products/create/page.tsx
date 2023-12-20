import {ReactElement} from 'react';
import CreateProductForm from "@/components/forms/CreateProductForm";
import {ICategory} from "@/interfaces/ICategory";
import {getAllCategories} from "@/services/CategoryService";

export const dynamic = 'force-dynamic';

export default async function CreateProductsPage(): Promise<ReactElement> {

    const allCategories: ICategory[] = await getAllCategories();

    return (
        <>
            <h2 className='mb-5 text-3xl'>Create a new Product</h2>
            <CreateProductForm categories={allCategories}/>
        </>
    );
};
