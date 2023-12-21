import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@model/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.Google_id,
      clientSecret: process.env.Google_secret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const session_user = await User.findOne({
        email: session.user.email,
      });
      session.user.id = session_user._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        //check if user allready exits
        await connectToDb();
        const user_exits = await User.findOne({
          email: profile.email,
        });
        //if not create a new user
        if (!user_exits) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
