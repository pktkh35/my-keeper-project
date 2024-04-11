'use client'

import { Each } from "../Each"
import { Card } from "../ui/card"

const TeamsList = ({
    teams
}) => {
    return teams.length > 0 ? <Each
        of={teams}
        render={team => {
            return <Card>

            </Card>
        }}
    /> : <div className="w-full h-[650px] flex items-center justify-center text-xs font-bold bg-gray-100 rounded">
        <span className="opacity-60">
            You're not on any team.
        </span>
    </div>
}

export default TeamsList