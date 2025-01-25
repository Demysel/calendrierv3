import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/lib/dbConnect';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await connectToDB();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      session.user.id = user?._id.toString();
      return session;
    },
    async signIn({ user }) {
      await connectToDB();
      const existingUser = await mongoose.models.User.findOne({ email: user.email });
      if (!existingUser) {
        await mongoose.models.User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    }
  }
});
