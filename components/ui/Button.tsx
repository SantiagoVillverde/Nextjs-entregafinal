import {FC} from "react";

interface ButtonProps {
    text: string;
}

const Button: FC<ButtonProps> = ({text}) => {
    return (
        <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 shadow hover:text-white">
            {text}
        </button>
    )
}

export default Button;
