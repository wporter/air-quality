import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";

import { cert } from "firebase-admin/app";

export const options = {
    // eslint-disable-next-line new-cap
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
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

  // pages: {
  //     signIn: "/signIn"
  // }
};
// eslint-disable-next-line new-cap
const handler = NextAuth(options);

export { handler as GET, handler as POST };
