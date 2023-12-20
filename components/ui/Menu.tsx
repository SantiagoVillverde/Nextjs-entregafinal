'use client'
import {FC, ReactElement} from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import {HomeIcon, UserIcon, RocketLaunchIcon} from "@heroicons/react/24/solid";
import { ICategory } from "@/interfaces/ICategory";

interface MenuProps {
    open: boolean;
    categories: ICategory[];
}

interface MenuOption {
    title: string;
    url: string;
    icon: ReactElement;
    gap: boolean;
}

const Menu: FC<MenuProps> = ({ open, categories}) => {
    const pathname = usePathname()

    const staticMenu = [
        { title: "Home",
            url: '/',
            icon: <HomeIcon className="h-6 w-6" />,
            gap: false
        },
        {
            title: "Admin",
            url: '/admin',
            icon: <UserIcon className="h-6 w-6" />,
            gap: false
        }
    ];

    const categoriesMenu: MenuOption[] = categories?.map((category: ICategory, index: number) => (
        {
            title: category.title,
            url: `/category/${category.title.toLowerCase()}`,
            icon: <RocketLaunchIcon className="h-6 w-6" />,
            gap: index === 0
        }
    )) || [];

    const Menus = [...staticMenu, ...categoriesMenu];

    return (
        <ul className="pt-6">
            {Menus.map((menu, index) => (
                <li key={index}
                    className={`
                        flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${menu.gap ? "mt-9" : "mt-2"} 
                    `}
                >
                    <Link title={menu.title} className={`hover:text-blue-300 ${pathname === menu.url ? "text-blue-300" : ""} `} href={menu.url}>{menu.icon}</Link>
                    <Link href={menu.url} className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize ${pathname === menu.url ? "text-blue-300" : ""} `}>
                        {menu.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
