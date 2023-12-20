import { NextRequest, NextResponse } from 'next/server';
import OrderModel from '@/models/Order';
import { db } from '@/database';
import mongoose from "mongoose";
import ProductModel from "@/models/Products";

/**
 * Perform a POST request to create a new order.
 *
 * @async
 * @param {NextRequest} request - The request object containing the order data.
 * @returns {Promise<NextResponse>} The response object containing the result of the operation.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();

    try {
        const orderData = await request.json();

        const invalidProduct = orderData.products.find((product: { productId: string; }) =>
            !mongoose.isValidObjectId(product.productId)
        );

        if (invalidProduct) {
            return new NextResponse(JSON.stringify({
                error: `Invalid ProductId: ${invalidProduct.productId}`
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const updateStockPromises = orderData.products.map(async (product: { productId: string; quantity: number; }) => {
            const dbProduct = await ProductModel.findById(product.productId);
            if (dbProduct) {
                dbProduct.stock -= product.quantity;
                return dbProduct.save();
            } else {
                throw new Error(`Product with id ${product.productId} not found`);
            }
        });

        await Promise.all(updateStockPromises);

        const newOrder = new OrderModel(orderData);
        const savedOrder = await newOrder.save();

        const responseObj = {
            orderNumber: savedOrder._id.toString()
        };

        return new NextResponse(JSON.stringify(responseObj), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        let errorMessage = 'An error occurred while creating the order.';
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
