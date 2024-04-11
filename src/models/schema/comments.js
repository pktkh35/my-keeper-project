import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    linkTo: {
        type: String,
        default: "task"
    },
    content: {
        type: Object,
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