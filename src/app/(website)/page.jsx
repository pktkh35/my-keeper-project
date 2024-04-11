import CreateTeams from "@/components/Tasks/CreateTeams";
import TeamsList from "@/components/Tasks/TeamsList";
import { auth } from "@/lib/auth"
import { TEAMS } from "@/models/db";

const page = async () => {
  const session = await auth();
  const teams = await TEAMS.find({
    members: {
      $nin: [session.user?.email]
    }
  });

  return <>
    <main className="min-h-screen">
      <div className="container max-w-screen-xl mx-auto mt-2">
        <div className="w-full flex items-center justify-between p-2 border-b">
          <p className="font-bold text-md">
            My Currents Tasks
          </p>
          <CreateTeams />
        </div>
        <div className="mt-2">
          <TeamsList teams={teams} />
        </div>
      </div>
    </main>
  </>
}

export default page