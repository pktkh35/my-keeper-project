import mongoose from "mongoose";
import { ROOMS } from "./schema/rooms";
import { TASKS } from "./schema/tasks";

if (mongoose.connect) {
    mongoose.connect(process.env.MONGODB_URL);
    mongoose.Promise = global.Promise;
}

export {
    ROOMS,
    TASKS
}