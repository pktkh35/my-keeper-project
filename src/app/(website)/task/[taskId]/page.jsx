import { GROUPS, TASKS, TEAMS } from "@/models/db"
import { redirect } from "next/navigation";
import Link from 'next/link'
import { ObjectId } from 'mongodb'
import AddNewTask from "@/components/Task/AddNewTask";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params, searchParams }, parent) {
    const { taskId } = params;

    const group = await GROUPS.findOne({
        _id: taskId
    });
    
    const team = await TEAMS.findOne({
        _id: group.teamId
    })
    
    return {
        title: group.name + " - " + team.name + " | My Keeper",
        description: group.description,
        openGraph: {
            type: 'website',
            url: `https://keeper.athens-groups.com/task/${taskId}`,
            title: group.name + " - " + team.name,
            description: group.description,
            images: [
                {
                    url: "https://keeper.athens-groups.com/img/logo.png"
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: group.name + " - " + team.name,
            description: group.description,
            images: ["https://keeper.athens-groups.com/img/logo.png"],
        },
    }
}

const page = async ({
    params
}) => {
    const session = await auth();
  
    if (!session) {
      redirect('/login');
    }
  
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
                <div className="text-xs">
                    {tasks.filter(t => t.status === "success").length}/{tasks.length}
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <AddNewTask taskId={taskId} tasks={tasks.map(t => ({ ...t, creatorData: t.creatorData[0] }))} />
            </div>
        </div>
    </>
}

export default page