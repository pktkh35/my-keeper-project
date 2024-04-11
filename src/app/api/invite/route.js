import { getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { INVITES } from "@/models/db";

export const GET = async req => {
    await dbConnect();
    const token = getToken(req.cookies);

    if (!token) {
        return Response.json([])
    }

    const user = await getUserFromToken(token);
    const invites = await INVITES.find({
        reciever: user.email
    });

    return Response.json(invites);
}