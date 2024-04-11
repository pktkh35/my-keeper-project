'use client'

import { Each } from "../Each"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import toast from 'react-hot-toast'
import axios from 'axios'
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"

const TaskList = ({
    tasks,
    setTaskList
}) => {
    const changeStatus = async (taskId, status) => {
        const toastId = toast.loading('Updating task...');
        const result = await axios.post("/api/task/update", {
            taskId, status
        }).then(res => res.data).catch(err => toast.error(err.message, {
            id: toastId
        }));

        if (result?.status === "success") {
            setTaskList(prev => prev.map(t => t._id === taskId ? { ...t, status } : t));
        }

        toast[result?.status || "error"](result.message, {
            id: toastId
        })
    }

    const removeTask = async taskId => {
        const toastId = toast.loading('Removing task...');
        const result = await axios.post("/api/task/remove", {
            taskId,
        }).then(res => res.data).catch(err => toast.error(err.message, {
            id: toastId
        }));

        if (result?.status === "success") {
            setTaskList(prev => prev.filter(t => t._id !== taskId));
        }

        toast[result?.status || "error"](result.message, {
            id: toastId
        })
    }
    return <>
        <Progress value={(tasks.filter(t => t.status === "success").length / (tasks.length || 1)) * 100} />
        <Each
            of={tasks}
            render={task => {
                const title = task.content?.name || task.content?.description
                return <ContextMenu>
                    <ContextMenuTrigger>
                        <div className="border p-4 rounded-[22px] flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 transition-all">
                            <div className=" flex items-center gap-2">
                                <div className={"w-4 h-4 flex items-center justify-center rounded-full " + (task.status === "waiting" ? "bg-gray-800/20" : "") + (task.status === "processing" ? "bg-blue-400" : "") + (task.status === "success" ? "bg-green-400" : "")}>
                                    {
                                        task.status === "processing" ? <i className="fa-light text-white fa-loader fa-spin text-[8px]" /> : null
                                    }
                                    {
                                        task.status === "success" ? <i className="fa-light text-white fa-check text-[8px]" /> : null
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-md font-bold">
                                        {title}
                                    </div>
                                    {
                                        task.content?.description !== "" && task.content?.name ? <p className="text-xs">
                                            {task.content?.description}
                                        </p> : null
                                    }
                                </div>
                            </div>
                            <Button variant="ghost" onClick={() => removeTask(task._id)}>
                                <i className="fa-solid fa-trash"></i>
                            </Button>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={() => changeStatus(task._id, "waiting")}>กำลังรอ</ContextMenuItem>
                        <ContextMenuItem onClick={() => changeStatus(task._id, "processing")}>กำลังทำ</ContextMenuItem>
                        <ContextMenuItem onClick={() => changeStatus(task._id, "success")}>ทำเสร็จแล้ว</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>

            }}
        />
    </>
}

export default TaskList