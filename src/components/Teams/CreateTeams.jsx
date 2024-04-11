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

const CreateTeams = () => {
    const router = useRouter();
    const onSumbit = async e => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        const toastId = toast.loading('Creating room...');
        const result = await axios.post("/api/teams/create", form).then(res => res.data).catch(err => toast.error('Network Error', {
            id: toastId
        }));

        if (result?.status === "success") {
            router.push('/team/'+result.teams._id);
            toast.success(result.message, {
                id: toastId
            });
        } else {
            toast.error(result.message, {
                id: toastId
            });
        }
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                สร้างทีม
            </Button>
        </DialogTrigger>
        <DialogContent>
            <form onSubmit={onSumbit}>
                <DialogHeader>
                    <DialogTitle>การสร้างทีมใหม่</DialogTitle>
                    <DialogDescription>
                        คุณสามารถเชิญคนอื่นเข้ามาในทีมของคุณได้
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">ชื่อทีม</Label>
                        <Input type="text" name="name" id="name" placeholder="ระบุชื่อทีมของคุณ" required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">คำอธิบาย</Label>
                        <Textarea name="description" id="description" placeholder="ใส่คำอธิบายทีมของคุณ" />
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
}

export default CreateTeams