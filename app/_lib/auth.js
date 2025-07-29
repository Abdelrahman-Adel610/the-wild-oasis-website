import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

function generateRandomInt8() {
  const bytes = randomBytes(8);
  return bytes.readBigInt64BE(0);
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GIT_ID,
      clientSecret: process.env.AUTH_GIT_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      return !!auth;
    },
    async signIn({ user, email }) {
      try {
        const does_user_exist = await getGuest(user.email);
        if (does_user_exist) return true;
        await createGuest({
          fullName: user.name,
          email: user.email,
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const my_user = await getGuest(session.user.email);
      session.user.id = my_user?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
