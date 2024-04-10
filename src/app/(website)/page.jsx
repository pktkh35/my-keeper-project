import CreateRooms from "@/components/Tasks/CreateRooms";
import RoomsList from "@/components/Tasks/RoomsList";
import { auth } from "@/lib/auth"
import { ROOMS } from "@/models/db";

const page = async () => {
  const session = await auth();
  const rooms = await ROOMS.find({
    email: session.user?.email
  });

  return <>
    <div className="container max-w-screen-xl mx-auto mt-2">
      <div className="w-full flex items-center justify-between p-2 border-b">
        <p className="font-bold text-md">
          My Currents Tasks
        </p>
        <CreateRooms />
      </div>
      <div className="mt-2">
        <RoomsList rooms={rooms} />
      </div>
    </div>
  </>
}

export default page