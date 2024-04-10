import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
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