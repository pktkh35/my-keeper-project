import { authOptions, getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { INVITES, TEAMS } from "@/models/db";
import { ObjectId } from 'mongodb'

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
    const { teamId, email } = await req.json();

    const exitUser = await authOptions.adapter.getUserByEmail(email);

    if (!exitUser) {
        return Response.json({
            status: "error",
            message: "This email isn't in our database."
        })
    }

    const team = await TEAMS.findOne({
        _id: new ObjectId(teamId),
        members: {
            $in: [email]
        }
    })

    if (team) {
        return Response.json({
            status: "error",
            message: "This user is in your team already."
        })
    }

    const exitInvites = await INVITES.findOne({
        teamId,
        status: "waiting",
        reciever: email
    })

    if (exitInvites) {
        return Response.json({
            status: "error",
            message: "You have invite this user already."
        })
    }

    const newInvites = new INVITES({
        sender: user.email,
        reciever: email,
        teamId: new ObjectId(teamId),
    })

    await newInvites.save();

    return Response.json({
        status: "success",
        message: "Create Invites Successfully",
    })
}