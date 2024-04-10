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

const CreateRooms = () => {
    const onSumbit = async e => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        const toastId = toast.loading('Creating room...');
        const result = await axios.post("/api/rooms/create", form).then(res => res.data).catch(err => toast.error('Network Error', {
            id: toastId
        }));

        toast.success(result.message, {
            id: toastId
        });
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                CREATE NEW ROOMS
            </Button>
        </DialogTrigger>
        <DialogContent>
            <form onSubmit={onSumbit}>
                <DialogHeader>
                    <DialogTitle>Create New Rooms</DialogTitle>
                    <DialogDescription>
                        You can invite member to your rooms in rooms setting page.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col mt-2">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Room Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Please, Enter Task Room Name" required />
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
    </Dialog>
}

export default CreateRooms