'use client'
import React, {FC, useState} from 'react';
import Link from "next/link";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {IProduct} from "@/interfaces/IProduct";
import {ICategory} from "@/interfaces/ICategory";

interface EditProductFormProps {
    categories: ICategory[];
    product: IProduct;
}

const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    stock: Yup.number().required('Required'),
    categoryId: Yup.string().required('Required')
});

const EditProductForm: FC<EditProductFormProps> = ({categories, product}) => {
    const [productUpdated, setProductUpdated] = useState<boolean>(false);

    const initialValues = {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
    };

    const handleSubmit = async (
        values: typeof initialValues,
        {setSubmitting}: FormikHelpers<typeof initialValues>
    ) => {
        setSubmitting(true);
        try {
            const productResponse = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values),
            });

            if (!productResponse.ok) {
                console.error('Server error');
            }

            const productResult = await productResponse.json();
            setProductUpdated(productResult.title);

        } catch (error) {
            console.error('Error:', error);
        }
        setSubmitting(false);
    };

    if (productUpdated) {
        return (
            <div className="flex flex-col justify-center items-center h-full pb-10">
                <p className="text-green-500 text-3xl pt-6">Your product {productUpdated} has been updated successfully!</p>
                <Link className="text-blue-500 text-xl p-6" href="/admin" prefetch={false}>
                    Go back to dashboard
                </Link>
            </div>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="p-6 flex flex-wrap items-start justify-between">
                    <div className="mb-4 pr-2  w-1/2 ">
                        <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
                        <Field type="text" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="title" component="div" className="text-red-300 text-xs italic"/>
                    </div>

                    <div className="mb-4 pl-2 w-1/2">
                        <label htmlFor="price" className="block text-white text-sm font-bold mb-2">Price</label>
                        <Field type="number" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="price" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 pr-2 w-1/2">
                        <label htmlFor="stock" className="block text-white text-sm font-bold mb-2">Stock</label>
                        <Field type="number" name="stock" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 pl-2 w-1/2">
                        <label htmlFor="categoryId" className="block text-white text-sm font-bold mb-2">Category</label>
                        <Field as="select" name="categoryId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id.toString()} value={category._id.toString()}>
                                    {category.title}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 pl-2 w-full">
                        <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
                        <Field as="textarea" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mt-6 pr-2 flex w-full items-center justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-1/4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                            ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                        >
                            Edit Product!
                        </button>

                        <button type="reset" className="w-1/4 font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gray-500 hover:bg-gray-700 text-white">
                            Reset
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditProductForm;
