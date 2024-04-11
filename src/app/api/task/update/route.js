import { auth, getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { TASKS } from "@/models/db";

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
    const { taskId, ...newData } = await req.json();
    const task = await TASKS.findOne({
        _id: taskId
    })

    if (!task) {
        return Response.json({
            status: "error",
            message: "Can't find this task on database.",
        })
    }

    await TASKS.updateOne({
        _id: taskId
    }, newData);

    return Response.json({
        status: "success",
        message: "Update Task Successfully",
    })
}