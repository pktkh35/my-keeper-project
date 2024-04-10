'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
    const session = useSession();

    return <>
        <div className="sticky w-screen h-[60px] bg-gray-50 flex items-center justify-center border-b">
            <div className="container flex items-center justify-between">
                <Link className="font-bold text-md" href="/">
                    My Keeper
                </Link>
                <div className="flex gap-2 items-center">
                    {
                        session.status === "authenticated" ? <>
                            <div className="font-bold text-xs flex gap-1 items-center border-r pr-2 h-5">
                                Welcome, <span className="opacity-50">{session.data.user?.name}</span>
                                <Avatar>
                                    <AvatarImage src={session.data.user?.image} />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                            </div>
                            <a onClick={() => signOut()} className="cursor-pointer font-bold text-md">
                                Logout
                            </a>
                        </> : null
                    }
                </div>
            </div>
        </div>
    </>
}

export default Navbar