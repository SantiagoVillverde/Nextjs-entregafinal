import {FC} from "react";
import Link from "next/link";

interface ButtonWithLinkProps {
    url: string;
    text: string;
}

const ButtonWithLink: FC<ButtonWithLinkProps> = ({url, text}) => {
    return (
        <>
            <Link title={text} href={url}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    {text}
                </button>
            </Link>
        </>
    )
}

export default ButtonWithLink;
