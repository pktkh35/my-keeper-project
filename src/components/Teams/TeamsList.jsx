'use client'

import { Each } from "../Each";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const TeamsList = ({
    teams
}) => {
    return teams.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Each
            of={teams}
            render={team => <Link href={`/team/${team._id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{team.name.toUpperCase()}</CardTitle>
                        <CardDescription>
                            {
                                team.description
                            }
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>}
        />
    </div> : <div className="w-full h-[650px] flex items-center justify-center text-xs font-bold bg-gray-50 rounded">
        <span className="opacity-60">
            คุณไม่ได้อยู่ในทีมไหนๆเลย
        </span>
    </div>
}

export default TeamsList