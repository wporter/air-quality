import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import { firebaseAdapter } from "@next-auth/firebase-adapter";

import firebase from "firebase/app";
import "firebase/firestore";

const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(/* your config */)
).firestore();

export const options = {
  providers: [
    // eslint-disable-next-line new-cap
    googleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: firebaseAdapter(firestore),

  // pages: {
  //     signIn: "/signIn"
  // }
};
// eslint-disable-next-line new-cap
const handler = NextAuth(options);

export { handler as GET, handler as POST };
