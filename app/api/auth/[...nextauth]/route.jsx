import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import userModel from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await userModel.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if user already exists
        const existingUser = await userModel.findOne({ email: profile.email });
        // create a new user
        if (!existingUser) {
          await userModel.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
