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
    const invites = await INVITES.aggregate([
        {
            $match: {
                reciever: user.email,
                status: "waiting"
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: 'email',
                as: 'senderData'
            }
        },
        {
            $lookup: {
                from: 'teams',
                localField: 'teamId',
                foreignField: '_id',
                as: 'team'
            }
        },
    ]);

    return Response.json(JSON.parse(JSON.stringify(invites)).map(i => ({ ...i, sender: i.senderData[0], team: i.team[0], senderData: undefined })));
}