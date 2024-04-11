'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const Login = () => {
    return <div className="w-screen h-screen flex items-center justify-center" style={{
        background: "url(./img/bg.jpg)",
        backgroundSize: "cover"
    }}>
        <div className="p-5 backdrop-blur rounded bg-gray-50/20 flex flex-col items-center">
            <Avatar>
                <AvatarImage src="./img/logo.png" />
                <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <p className="text-2xl text-white">
                Welcome to <b className="text-orange-400">My Keeper</b>
            </p>
            <p className="text-sm opacity-60 text-white">
                ให้เราช่วยคุณจัดการรายการสิ่งที่ต้องทำเพื่อให้เป็นระบบระเบียบและตรวจสอบง่ายมากขึ้น
            </p>
            <Button className="w-full mt-2" onClick={() => signIn("discord", {
                callbackUrl: "/",
                redirect: "/"
            })}>
                เข้าสู่ระบบด้วย Discord
            </Button>
        </div>
        <div className="fixed h-12 flex items-center bottom-0 w-full justify-center text-white text-xs">
            <div className="h-full px-8 backdrop-blur flex items-center rounded bg-gray-50/20">
                <span className="opacity-80 font-medium">
                    © COPYRIGHT 2022 ALL RIGHTS RESERVED BY ATHENS GRUOPS
                </span>
            </div>
        </div>
    </div>
}

export default Login