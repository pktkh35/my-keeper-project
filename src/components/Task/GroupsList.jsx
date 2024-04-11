'use client';

import { Each } from "../Each";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const GroupsList = ({
    list
}) => {
    return list.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <Each
            of={list}
            render={team => <Link href={`/task/${team._id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{team.name.toUpperCase()}</CardTitle>
                        <CardDescription>
                            <Progress value={(team.list.filter(t => t.status === "success").length / (team.list.length || 1)) * 100} />
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>}
        />
    </div> : <div className="w-full h-[650px] flex items-center justify-center text-xs font-bold bg-gray-50 rounded">
        <span className="opacity-60">
            This team dont have any task group.
        </span>
    </div>
}

export default GroupsList