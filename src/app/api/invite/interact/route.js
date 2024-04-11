import { getToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { INVITES, TEAMS } from "@/models/db";

export const POST = async req => {
    await dbConnect();
    const token = getToken(req.cookies);

    if (!token) {
        return Response.json({
            status: "error",
            message: "Authorization Unsuccessfully."
        })
    }

    const { id, type } = await req.json();

    const exitInvites = await INVITES.findOne({
        _id: id
    })

    if (!exitInvites) {
        return Response.json({
            status: "error",
            message: "Can't find this invitation in our database."
        })
    }

    await INVITES.updateOne({
        _id: id
    }, {
        $set: {
            status: type
        }
    });

    if (type === "accept") {
        await TEAMS.updateOne({
            _id: exitInvites.teamId
        }, {
            $push: {
                members: exitInvites.reciever
            }
        })
    }

    return Response.json({
        status: "success",
        message: type.slice(0, 1).toUpperCase() + type.slice(1) + " Successfully",
    })
}