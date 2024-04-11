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
import { Textarea } from "../ui/textarea"
import { useRef, useState } from "react"
import TaskList from "./TaskList"

const AddNewTask = ({
    taskId,
    tasks
}) => {
    const ref = useRef();
    const [taskList, setTaskList] = useState(tasks);

    const onSumbit = async e => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        const toastId = toast.loading('Creating task...');
        const result = await axios.post("/api/task/create", {
            ...form,
            taskId
        }).then(res => res.data).catch(err => toast.error('Network Error', {
            id: toastId
        }));

        if (result?.status === "success") {
            ref.current?.click();
            setTaskList(prev => ([...prev, result.task]))
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
                    เพิ่มสิ่งที่ต้องทำ <i className="fa-light fa-plus ml-2 text-xs opacity-60"></i>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSumbit}>
                    <DialogHeader>
                        <DialogTitle>การเพิ่มสิ่งที่ต้องทำ</DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex flex-col gap-2 mt-2">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">หัวข้อ</Label>
                            <Input type="text" name="name" id="name" placeholder="กรอกหัวข้อสิ่งที่ต้องทำ" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="description">คำอธิบาย</Label>
                            <Textarea type="text" name="description" id="description" placeholder="กรอกคำอธิบายข้อสิ่งที่ต้องทำ" />
                        </div>
                    </div>
                    <DialogFooter className="mt-2 justify-start lg:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" ref={ref}>
                                ปิด
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            เพิ่ม
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        <TaskList tasks={taskList} setTaskList={setTaskList} />
    </>
}

export default AddNewTask