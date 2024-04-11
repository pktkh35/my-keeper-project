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

async function getUserFromToken(token) {
    try {
        const user = await jwt.verify(token, process.env.NEXTAUTH_SECRET);

        return user
    } catch (error) {
        return null
    }
}

function getToken(cookies) {
    const token = cookies.get(process.env.NODE_ENV === "development" ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    return token?.value
}

function auth(...args) {
    return getServerSession(...args, authOptions)
}

export { authOptions, auth, getUserFromToken, getToken }
