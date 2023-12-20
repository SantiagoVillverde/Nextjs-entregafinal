import {NextRequest, NextResponse} from 'next/server';
import mongoose from 'mongoose';
import ProductModel from '@/models/Products';
import {db} from '@/database';
import {IProduct} from '@/interfaces/IProduct';

export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();

    try {
        const productData: IProduct = await request.json();

        if (!mongoose.isValidObjectId(productData.categoryId)) {
            return new NextResponse(JSON.stringify({
                error: 'Invalid categoryId'
            }), {
                status: 400,
                headers: {'Content-Type': 'application/json'}
            });
        }

        const newProduct = new ProductModel(productData);
        const savedProduct = await newProduct.save();

        return new NextResponse(JSON.stringify(savedProduct), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        let errorMessage = 'An error occurred while creating the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}
