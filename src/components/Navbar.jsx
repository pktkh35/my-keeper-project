'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import axios from "axios";
import { Each } from "./Each";
import { Button } from "./ui/button";
import toast from 'react-hot-toast'

const Navbar = () => {
    const session = useSession();
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        axios.get("/api/invite/").then(res => setInvites(res.data)).catch(err => { });
    }, []);

    const interactInvite = async (invite, type) => {
        const toastId = toast.loading('Loading...');
        const result = await axios.post("/api/invite/interact", {
            id: invite._id,
            type
        }).then(res => res.data).catch(err => toast.error(err.message, {
            id: toastId
        }));

        if (result?.status === "success") {
            setInvites(prev => prev.filter(t => t._id !== invite._id));
        }

        toast[result?.status || "error"](result.message, {
            id: toastId
        })
    }

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
                            <Sheet>
                                <SheetTrigger>
                                    <div className="cursor-pointer font-bold text-md relative mr-1">
                                        Invite
                                        {
                                            invites.length > 0 ? <div className="absolute w-2 h-2 bg-red-500 bottom-[60%] left-[101%] rounded-full"></div> : null
                                        }
                                    </div>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Your Invitations List</SheetTitle>
                                        <SheetDescription>
                                            {
                                                invites.length > 0 ? <Each
                                                    of={invites}
                                                    render={invite => <div className="border py-2 px-4 mb-2 rounded-sm">
                                                        <div className="text-lg font-bold text-black">
                                                            คำเชิญเข้าร่วมทีม
                                                        </div>
                                                        <div className="text-md ml-2">
                                                            คุณได้รับคำเชิญให้เข้าร่วมทีม <b>{invite.team.name}</b>
                                                        </div>
                                                        <div className="flex gap-2 mt-2 w-full">
                                                            <Button size="sm" className="w-full" onClick={() => interactInvite(invite, "accept")}>
                                                                ตอบรับ
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="w-full" onClick={() => interactInvite(invite, "reject")}>
                                                                ปฎิเสธ
                                                            </Button>
                                                        </div>
                                                    </div>}
                                                /> : <div className="w-full h-[256px] bg-gray-50 flex items-center justify-center font-bold text-xs">
                                                    You don{"'"}t have any invitation.
                                                </div>
                                            }
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>

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