import { Schema, model, models } from "mongoose";

const groupsSchema = new Schema({
    teamId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createBy: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
})

export const GROUPS = models?.groups || model("groups", groupsSchema)