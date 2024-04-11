import { Schema, Types, model, models } from "mongoose";

const inviteSchema = new Schema({
    sender: String,
    reciever: String,
    teamId: Types.ObjectId,
    status: {
        type: String,
        default: "Waiting"
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
})

export const INVITES = models?.invites || model("invites", inviteSchema)