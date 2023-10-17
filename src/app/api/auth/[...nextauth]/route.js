import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import { firebaseAdapter } from "@next-auth/firebase-adapter";

import { cert } from "firebase-admin/app";
import "firebase/firestore";

export const options = {
  providers: [
    // eslint-disable-next-line new-cap
    googleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: firebaseAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    }),
  }),

  // pages: {
  //     signIn: "/signIn"
  // }
};
// eslint-disable-next-line new-cap
const handler = NextAuth(options);

export { handler as GET, handler as POST };
