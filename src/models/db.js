import mongoose from "mongoose";
import { TEAMS } from "./schema/teams";
import { TASKS } from "./schema/tasks";

if (mongoose.connect) {
    mongoose.connect(process.env.MONGODB_URL);
    mongoose.Promise = global.Promise;
}

export {
    TEAMS,
    TASKS
}