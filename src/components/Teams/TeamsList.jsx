'use client'

import { Each } from "../Each";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const TeamsList = ({
    teams
}) => {
    return teams.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-4">
        <Each
            of={teams}
            render={team => <Link href={`/team/${team._id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{team.name.toUpperCase()}</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, a aut nihil expedita veritatis commodi placeat dolorum fuga porro recusandae neque ratione, eos quam distinctio. Id cupiditate voluptates minus et.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>}
        />
    </div> : <div className="w-full h-[650px] flex items-center justify-center text-xs font-bold bg-gray-50 rounded">
        <span className="opacity-60">
            You're not on any team.
        </span>
    </div>
}

export default TeamsList