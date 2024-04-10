import { Schema, model, models } from "mongoose";

const roomsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
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

export const ROOMS = models?.rooms || model("rooms", roomsSchema)