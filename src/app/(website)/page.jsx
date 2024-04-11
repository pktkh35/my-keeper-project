import CreateTeams from "@/components/Teams/CreateTeams";
import TeamsList from "@/components/Teams/TeamsList";
import { auth } from "@/lib/auth"
import { TEAMS } from "@/models/db";

const page = async () => {
  const session = await auth();
  const teams = await TEAMS.find({
    members: {
      $in: [session.user.email]
    }
  });

  return <>
    <div className="container mx-auto mt-2">
      <div className="w-full flex items-center justify-between py-2 border-b">
        <p className="font-bold text-md">
          My Currents Tasks
        </p>
        <CreateTeams />
      </div>
      <div className="mt-2 ml-4">
        <TeamsList teams={teams} />
      </div>
    </div>
  </>
}

export default page