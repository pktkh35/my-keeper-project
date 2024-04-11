import { Schema, model, models } from "mongoose";

const teamsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    members: {
        type: Array,
        default: []
    },
    creator: {
        type: String,
        default: '',
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
})

export const TEAMS = models?.teams || model("teams", teamsSchema)