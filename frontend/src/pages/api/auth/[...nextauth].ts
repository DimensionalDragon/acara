import env from "@/config/env";
import authServices from "@/services/auth.service";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const config: AuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24, // This is in seconds, so in total it's 1 day (24 hours)
    },
    secret: env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                identifier: {label: 'identifier', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(
                credentials: Record<'identifier' | 'password', string> | undefined
            ): Promise<UserExtended | null> {
                const {identifier, password} = credentials as {identifier: string, password: string};
                
                const result = await authServices.login({identifier, password});
                const accessToken = result.data.data;

                const me = await authServices.getProfileWithToken(accessToken);
                const user = me.data.data;

                if(accessToken && result.status === 200 && user._id && me.status === 200) {
                    user.accessToken = accessToken;
                    return user;
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({token, user}: {token: JWTExtended, user: UserExtended | null}) {
            if(user) {
                token.user = user;
            }
            return token;
        },
        async session({session, token}: {session: SessionExtended, token: JWTExtended}) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        }
    },
}

export default NextAuth(config);