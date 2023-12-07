import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const OPTIONS = {
  // eslint-disable-next-line new-cap
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    }),
  }),

  providers: [
    // eslint-disable-next-line new-cap
    googleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
};
// eslint-disable-next-line new-cap
const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
