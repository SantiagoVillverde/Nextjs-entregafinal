import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ProductModel from '@/models/Products';
import CategoryModel from '@/models/Category';
import {IProductWithCategory} from "@/interfaces/IProduct";
import { db } from "@/database";

/**
 * Retrieves products based on category.
 *
 * @async
 * @param {NextRequest} request - The request object.
 * @param {Object} params - The request parameters.
 * @param {string} params.category - The category to filter products by.
 * @returns {Promise<NextResponse>} - The response object containing the products.
 * @throws {Error} - Throws an error if products retrieval fails.
 */
export async function GET(request: NextRequest, { params }: { params: { category: string } }): Promise<NextResponse> {
    const { category } = params;

    await db.connect();
    try {
        let products;
        if (category === 'all') {
            products = await ProductModel.find();
        } else {
            if (mongoose.isValidObjectId(category)) {
                products = await ProductModel.find({ categoryId: category });
            } else {
                const categoryData = await CategoryModel.findOne({ title: category });
                if (!categoryData) {
                    return new NextResponse(JSON.stringify({ error: `No products found in the '${category}' category.` }), {
                        status: 404,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                products = await ProductModel.find({ categoryId: categoryData._id });
            }
        }

        if (!products.length) {
            return new NextResponse(JSON.stringify({ error: `No products available in the selected category: ${category}.` }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const productsWithCategory: IProductWithCategory[] = await Promise.all(products.map(async (product) => {
            const categoryData = await CategoryModel.findById(product.categoryId);
            return {
                ...product.toObject(),
                categoryName: categoryData ? categoryData.title : 'Unknown'
            } as IProductWithCategory;
        }));

        return new NextResponse(JSON.stringify(productsWithCategory), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = `Failed to retrieve products for category '${category}'.`;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}
