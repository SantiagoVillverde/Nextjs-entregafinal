'use client'
import React, {FC, useContext, useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {CartContext} from "@/context/CartProvider";

const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
};

const OrderSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
});

const OrderForm: FC = () => {

    const {cart, dispatch} = useContext(CartContext);
    const [submitOrderId, setSubmitOrderId] = useState('');

    const removeAllItemsFromCart = () => dispatch({
        type: 'REMOVE_ALL_ITEMS_FROM_CART'
    });

    const handleSubmit = async (
        values: typeof initialValues,
        {setSubmitting}: FormikHelpers<typeof initialValues>
    ) => {

        const orderProducts = cart.items.map(item => ({
            productId: item.id,
            quantity: item.count
        }));

        const orderData = {
            ...values,
            products: orderProducts,
            totalPayment: cart.totalPayment,
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            const data = await response.json();
            setSubmitOrderId(data.orderNumber);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
        setSubmitting(false);
        removeAllItemsFromCart();
    };

    if (submitOrderId) {
        return (
            <div className="flex flex-col justify-center items-center h-full pb-10">
                <p className="text-green-500 text-3xl pb-6"> Your order has been submitted successfully!</p>
                <p className="text-lg">Your order number is: {submitOrderId}</p>
            </div>
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={OrderSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="p-6">

                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-white text-sm font-bold mb-2">Full Name</label>
                        <Field type="text" name="fullName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="fullName" component="div" className="text-red-300 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
                        <Field name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Phone</label>
                        <Field name="phone" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 ">
                        <label htmlFor="address" className="block text-white text-sm font-bold mb-2">Address</label>
                        <Field name="address" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="address" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-white text-sm font-bold mb-2">City</label>
                        <Field name="city" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="city" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="country" className="block text-white text-sm font-bold mb-2">Country</label>
                        <Field name="country" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="country" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <button
                        type="submit"
                        disabled={cart.items.length === 0 || isSubmitting}
                        className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
                            ${cart.items.length === 0 || isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                    >
                        Submit Order!
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default OrderForm;
