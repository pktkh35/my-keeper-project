import { auth, getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { TEAMS } from "@/models/db";

export const POST = async req => {
    await dbConnect();
    const token = getToken(req.cookies);

    if (!token) {
        return Response.json({
            status: "error",
            message: "Authorization Unsuccessfully."
        })
    }

    const user = await getUserFromToken(token);
    const { name, description } = await req.json();

    const newTeams = new TEAMS({
        name,
        description,
        creator: user.email,
        members: [user.email],
    })

    await newTeams.save();

    return Response.json({
        status: "success",
        message: "Create Teams Successfully",
        teams: {
            ...newTeams._doc
        }
    })
}