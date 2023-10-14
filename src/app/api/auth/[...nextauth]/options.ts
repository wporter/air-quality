import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { CredentialsProvider } from "next-auth/providers";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Please insert username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Please insert password",
        },
      },
      async authorize(credentials) {
        //retreive user data from here
        //change this later when database is created
        const user = { id: "user", name: "user", password: "password" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages: {
  //     signIn: "/signIn"
  // }
};
