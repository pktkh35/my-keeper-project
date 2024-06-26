import { Schema, Types, model, models } from "mongoose";

const taskSchema = new Schema({
    taskId: {
        type: Types.ObjectId,
        required: true,
    },
    content: {
        type: Object,
        default: []
    },
    status: {
        type: String,
        default: "waiting",
    },
    creator: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
})

export const TASKS = models?.tasks || model("tasks", taskSchema)