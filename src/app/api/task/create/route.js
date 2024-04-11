import { auth, getToken, getUserFromToken } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { TASKS } from "@/models/db";
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
    const { taskId, name, description } = await req.json();

    const newTask = new TASKS({
        taskId: new ObjectId(taskId),
        creator: user.email,
        content: {
            name,
            description
        }
    })

    await newTask.save();
    
    return Response.json({
        status: "success",
        message: "Create Task Successfully",
        task: {
            ...newTask._doc,
            creatorData: user
        }
    })
}