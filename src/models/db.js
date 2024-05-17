import mongoose from "mongoose";
import { TEAMS } from "./schema/teams";
import { TASKS } from "./schema/tasks";
import { GROUPS } from "./schema/groups";
import { INVITES } from "./schema/invites";

if (mongoose.connect) {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.Promise = global.Promise;
}
export {
    TEAMS,
    GROUPS,
    TASKS,
    INVITES
}