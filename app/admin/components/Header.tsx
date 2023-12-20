import {FC} from "react";
import Image from "next/image";
import {DocumentMagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {

    return (
        <header className="bg-stone-900 shadow-sm">
            <div className="flex justify-end md:justify-between items-center py-2 pr-2 md:pr-0 md:px-4">
                <div className="items-center hidden md:flex">
                    <DocumentMagnifyingGlassIcon className="h-6 w-6" />
                    <input
                        type="search"
                        className="block w-full pl-10 pr-3 py-2 ml-4 text-gray-700 bg-gray-100 border border-transparent rounded-md focus:border-blue-500 focus:bg-white focus:ring-0"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="mr-3">Bienvenido, <span className="text-blue-300 font-semibold">Admin</span></h1>
                    <Image
                        src="/gamebazar/user_avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-contain rounded-full shadow-md"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
