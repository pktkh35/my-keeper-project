import { auth } from "@/lib/auth"
import Login from "./(page)/Login"
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if (session) {
        redirect('/');
    }

    return <Login />
}

export default page