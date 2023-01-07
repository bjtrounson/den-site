import NextAuth, {DefaultSession, DefaultUser} from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session extends DefaultSession {
        user: User
    }
    interface User extends DefaultUser {
        role: string
    }
}
