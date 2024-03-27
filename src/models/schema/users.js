import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    roles: {
        type: String,
        default: "user"
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
})

export const USERS = models?.users || model("users", userSchema)