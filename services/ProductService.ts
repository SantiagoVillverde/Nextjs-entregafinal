import { IProduct } from "@/interfaces/IProduct";

export async function getProductById(productId: string): Promise<IProduct> {
    const res = await fetch(`${process.env.API_PRODUCTS_URL}/${productId}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getProductByCategory(category: number | string): Promise<IProduct[]> {
    const res = await fetch(`${process.env.API_PRODUCTS_URL}/category/${category}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function deleteProductById(productId: string): Promise<void> {
    const res = await fetch(`api/products/${productId}`, { method: 'DELETE' });
    if (!res.ok) {
        const errorBody = await res.json();
        const errorMessage = errorBody.error || 'Failed to delete the product';
        throw new Error(errorMessage);
    }
}
