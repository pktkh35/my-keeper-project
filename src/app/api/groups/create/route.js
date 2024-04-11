import { auth, getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { GROUPS } from "@/models/db";

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
    const { name, teamId, description } = await req.json();

    const newGroups = new GROUPS({
        teamId,
        name,
        description,
        createBy: user.email
    })

    await newGroups.save();

    return Response.json({
        status: "success",
        message: "Create Group Successfully",
        groups: {
            ...newGroups._doc
        }
    })
}