import GroupsList from "@/components/Task/GroupsList";
import SettingTeams from "@/components/Teams/SettingTeams";
import { GROUPS, TEAMS } from "@/models/db"
import { redirect } from "next/dist/server/api-utils";
import mongoose from 'mongoose'
import Link from 'next/link'
import { Each } from "@/components/Each";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = async ({
    params
}) => {
    const teams = await TEAMS.aggregate([
        {
            $lookup: {
                from: "users", // ระบุชื่อของ collection ที่ต้องการ join
                localField: "members", // ระบุ field ใน todos.teams ที่เก็บข้อมูล userId
                foreignField: "email", // ระบุ field ใน todos.users ที่จะใช้ในการเทียบ
                as: "membersData" // ระบุชื่อ field ที่จะเก็บข้อมูลที่ join มา
            }
        }
    ]);
    const { teamId } = params
    const team = teams.find(t => String(t._id) === String(teamId).trim());

    if (!team) {
        redirect('/');
    }

    const groups = await GROUPS.aggregate([
        {
            $match: {
                teamId
            }
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "list"
            }
        }
    ]);

    return <>
        <div className="container mx-auto mt-2">
            <div className="w-full flex items-center justify-between p-2 border-b">
                <div className="flex gap-2">
                    <Link href="/" className="px-2 my-auto hover:pr-3 hover:pl-1 transition-all">
                        <i className="fa-light fa-chevrons-left"></i>
                    </Link>
                    <p className="font-bold text-md">
                        {team.name}
                    </p>
                </div>
                <div className="flex gap-2">
                    <SettingTeams team={team} />
                </div>
            </div>
            <div className="flex jusitfy-between gap-2 mt-2">
                <div className="w-[75%]">
                    <GroupsList list={groups} />
                </div>
                <div className="bg-gray-50 w-[25%] rounded p-5 box-border">
                    <p className="text-md font-bold">
                        สมาชิกภายในทีม
                    </p>
                    <hr />
                    <div className="flex flex-col gap-2">
                        <Each
                            of={team.membersData}
                            render={member => <div className="flex items-center justify-between gap-2 p-2 bg-gray-100 mt-1 rounded">
                                <div className="flex items-center gap-2 text-xs font-bold">
                                    <Avatar className="w-7 h-7">
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback>MK</AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                </div>
                                {
                                    member.email === team.creator ? <i className="fa-solid text-xs text-orange-400 fa-crown"></i> : null
                                }
                            </div>}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default page