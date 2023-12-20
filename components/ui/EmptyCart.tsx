import {FC} from "react";
import Link from "next/link";
import Image from "next/image";

const EmptyCart: FC = () => {

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl">There are no products in the cart!</h1>
                <Image
                    src="/gamebazar/ybhx45zwsibzbkvjr6nc.png"
                    alt='There are no products in the cart!'
                    width={400}
                    height={400}
                    className="rounded-lg"
                />
                <Link href="/" className="text-blue-400 text-lg underline mt-5">Go back to home page</Link>
            </div>
        </>
    )
}

export default EmptyCart;
