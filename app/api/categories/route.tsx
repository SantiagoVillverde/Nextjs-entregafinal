import { NextRequest, NextResponse } from 'next/server';
import CategoryModel from '@/models/Category';
import { db } from "@/database";

/**
 * Fetches categories from the database and returns a JSON response.
 * @param {NextRequest} request - The request object containing information about the incoming request.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object containing the fetched categories in JSON format.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    await db.connect();
    try {
        const categories = await CategoryModel.find();
        return new NextResponse(JSON.stringify(categories), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An error occurred while fetching categories.';
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
