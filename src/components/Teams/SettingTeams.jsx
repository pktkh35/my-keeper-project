'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import axios from "axios";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"
import { useRef } from "react"

const SettingTeams = ({
    team
}) => {
    const inviteRef = useRef();
    const router = useRouter();
    const onSumbit = async e => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        const toastId = toast.loading('Inviting...');
        const result = await axios.post("/api/invite/create", {
            ...form,
            teamId: team._id
        }).then(res => res.data).catch(err => toast.error('Network Error', {
            id: toastId
        }));

        if (result?.status === "success") {
            inviteRef.current?.click();
            toast.success(result.message, {
                id: toastId
            });
        } else {
            toast.error(result.message, {
                id: toastId
            });
        }
    }

    const onSumbitGroup = async e => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        const toastId = toast.loading('Creating group...');
        const result = await axios.post("/api/groups/create", {
            ...form,
            teamId: team._id
        }).then(res => res.data).catch(err => toast.error(err.message, {
            id: toastId
        }));

        if (result?.status === "success") {
            router.push('/task/' + result.groups._id);
            toast.success(result.message, {
                id: toastId
            });
        } else {
            toast.error(result.message, {
                id: toastId
            });
        }
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    เชิญคน
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSumbit}>
                    <DialogHeader>
                        <DialogTitle>เชิญคนอื่นๆเข้าทีม</DialogTitle>
                        <DialogDescription>
                            กรอกอีเมลของคนที่เราต้องการให้อยู่ในทีม
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex flex-col mt-2">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">อีเมล</Label>
                            <Input type="email" name="email" id="email" placeholder="dummy@example.com" required />
                        </div>
                    </div>
                    <DialogFooter className="mt-2 justify-start lg:justify-end">
                        <DialogClose asChild>
                            <Button ref={inviteRef} type="button" variant="secondary">
                                ปิด
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            ส่งคำเชิญ
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        {/* <Dialog>
            <DialogTrigger asChild>
                <Button>
                    SETTING
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSumbit}>
                    <DialogHeader>
                        <DialogTitle>Create New Teams</DialogTitle>
                        <DialogDescription>
                            You can invite member to your teams in setting page.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex flex-col mt-2">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Team Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Please, Enter Task Team Name" required />
                        </div>
                    </div>
                    <DialogFooter className="mt-2 justify-start lg:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog> */}
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    สร้างหมวดหมู่ใหม่
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSumbitGroup}>
                    <DialogHeader>
                        <DialogTitle>การสร้างหมวดหมู่ใหม่</DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex flex-col mt-2 gap-2">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">ชื่อหมวดหมู่</Label>
                            <Input type="text" name="name" id="name" placeholder="กรุณาระบุชื่อหมวดหมู่" required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="description">คำอธิบายหมวดหมู่</Label>
                            <Textarea type="text" name="description" id="description" placeholder="ระบุคำอธิบายหมวดหมู่" />
                        </div>
                    </div>
                    <DialogFooter className="mt-2 justify-start lg:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                ปิด
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            สร้าง
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
}

export default SettingTeams