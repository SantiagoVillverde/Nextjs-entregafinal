'use client'
import {FC} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon} from "@heroicons/react/24/solid";

interface MenuLoginProps {
    open: boolean;
}

const MenuLogin: FC<MenuLoginProps> = ({ open}) => {

    const session = useSession();

    return (
        <div className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
            {session.data ? (
                <>
                    <button className="ml-1" title="Sign Out" onClick={() => signOut()}><ArrowLeftOnRectangleIcon className="h-6 w-6"/></button>
                    <button onClick={() => signOut()} className={`${!open && "hidden"} origin-left duration-200 text-blue-200 hover:text-blue-300 capitalize`}> {session.data?.user?.name}</button>
                </>
            ) : (
                <>
                    <button title="Sign In" onClick={() => signIn()}><ArrowRightOnRectangleIcon className="h-6 w-6"/></button>
                    <button onClick={() => signIn()} className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize`}>
                        SignIn
                    </button>
                </>
            )}
        </div>
    )
}

export default MenuLogin;
