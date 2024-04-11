import { GROUPS, TASKS } from "@/models/db"
import { redirect } from "next/dist/server/api-utils";
import Link from 'next/link'
import { ObjectId } from 'mongodb'
import AddNewTask from "@/components/Task/AddNewTask";

const page = async ({
    params
}) => {
    const { taskId } = params
    const group = await GROUPS.findOne({
        _id: taskId
    })
    const tasks = await TASKS.aggregate([
        {
            $match: {
                taskId: new ObjectId(taskId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: 'email',
                as: 'creatorData'
            }
        }
    ])

    console.log(tasks)

    if (!group) {
        redirect('/');
    }

    return <>
        <div className="container mx-auto mt-2">
            <div className="w-full flex items-center justify-between p-2">
                <div className="flex gap-2">
                    <Link href={"/team/" + group.teamId} className="px-2 my-auto hover:pr-3 hover:pl-1 transition-all">
                        <i className="fa-light fa-chevrons-left"></i>
                    </Link>
                    <p className="font-bold text-md">
                        {group.name}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <AddNewTask taskId={taskId} tasks={tasks.map(t => ({ ...t, creatorData: t.creatorData[0] }))} />
            </div>
        </div>
    </>
}

export default page