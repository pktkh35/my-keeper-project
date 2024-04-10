import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { ROOMS } from "@/models/db";
import { getSession } from "next-auth/react";

export const POST = async req => {
    await dbConnect();
    const session = await auth(req);
    console.log(session)
    const { name } = await req.json()

    const exitRoom = await ROOMS.find({
        name
    })

    if (exitRoom) {
        return Response.json({
            status: "success",
            message: "System working!!"
        })
    }

    return Response.json({
        status: "success",
        message: "System working!!"
    })
}