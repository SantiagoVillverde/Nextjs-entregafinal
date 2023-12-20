import {ReactElement} from "react";
import OrderForm from "@/components/forms/OrderForm";
import CartPreview from "@/components/ui/CartPreview";

export default function CheckOutPage(): ReactElement {

    return (
        <>
            <h1 className='mb-5 text-3xl'>Checkout</h1>
            <p className='mb-5'>Please fill in the form below to complete your order.</p>
            <div className="shadow-md sm:rounded-lg flex justify-between">
                <div className="overflow-y-auto w-[30%]">
                    <CartPreview/>
                </div>
                <div className="bg-stone-900 m-3 p-2 rounded-lg shadow-lg grow">
                    <h3 className="mb-4 text-lg">Order Form</h3>
                    <OrderForm/>
                </div>
            </div>
        </>
    )

}
