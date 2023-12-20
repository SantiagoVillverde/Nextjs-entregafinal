import {ICategory} from "@/interfaces/ICategory";

export async function getAllCategories(): Promise<ICategory[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CATEGORIES_URL}`);
    if (!res.ok) {
        throw new Error('Failed to fetch category data');
    }
    return res.json();
}

