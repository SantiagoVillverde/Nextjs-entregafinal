import {NextRequest, NextResponse} from 'next/server';
import mongoose from 'mongoose';
import CategoryModel from "@/models/Category";
import ProductModel from '@/models/Products';
import {IProductWithCategory} from "@/interfaces/IProduct";
import {db} from "@/database";

/**
 * Retrieves product data by product ID.
 *
 * @param {NextRequest} request - The NextRequest object.
 * @param {Object} params - The parameters object.
 * @param {string} params.productId - The ID of the product to retrieve.
 * @return {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export async function GET(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Provided product ID is invalid or malformed.'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    await db.connect();
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return new NextResponse(JSON.stringify({error: 'Product with the specified ID was not found.'}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const category = await CategoryModel.findById(product.categoryId);
        const responseProduct: IProductWithCategory = {
            ...product.toObject(),
            categoryName: category ? category.title : 'Unknown'
        };

        return new NextResponse(JSON.stringify(responseProduct), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An error occurred while retrieving product data.';
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

/**
 * Updates a product with the given product data.
 *
 * @param {NextRequest} request - The request object containing information about the incoming request.
 * @param {Object} params - The parameters object containing the productId.
 * @param {string} params.productId - The ID of the product to update.
 * @returns {Promise<NextResponse>} A promise that resolves to the updated product or an error response.
 */
export async function PUT(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Invalid productId'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        });
    }

    const productData = await request.json();
    await db.connect();

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            productData,
            {new: true}
        );

        if (!updatedProduct) {
            return new NextResponse(JSON.stringify({error: 'Product not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }

        return new NextResponse(JSON.stringify(updatedProduct), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        let errorMessage = 'An error occurred while updating the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    } finally {
        await db.disconnect();
    }
}


/**
 * Deletes a product by its productId.
 *
 * @async
 * @param {NextRequest} request - The request object.
 * @param {object} params - The parameters object.
 * @param {string} params.productId - The productId of the product to delete.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 *   The NextResponse object contains the response data and status code.
 */
export async function DELETE(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Invalid productId'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        });
    }

    await db.connect();
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({error: 'Product not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }

        return new NextResponse(JSON.stringify({message: 'Product deleted successfully'}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        let errorMessage = 'An error occurred while deleting the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    } finally {
        await db.disconnect();
    }
}

