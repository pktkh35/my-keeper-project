import { USERS } from './schema/users'
import mongoose from "mongoose";

if (mongoose.connect) {
    mongoose.connect(process.env.MONGODB_URL);
    mongoose.Promise = global.Promise;
}

export {
    USERS
}