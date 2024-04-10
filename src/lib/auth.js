import { MongooseAdapter } from '@choutkamartin/mongoose-adapter';
import jwt from 'jsonwebtoken'
import { getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

const authOptions = {
    jwt: {
        async encode(params) {
            return jwt.sign(params.token, params.secret)
        },
        async decode(params) {
            return jwt.verify(params.token, params.secret);
        },
    },
    adapter: MongooseAdapter(process.env.MONGODB_URL),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt"
    }
}

function auth(...args) {
    return getServerSession(...args, authOptions)
}

export { authOptions, auth }
