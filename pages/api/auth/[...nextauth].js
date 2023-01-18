import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "../../../lib/mongodb";
if (!process.env.GOOGLE_CLIENT_ID){
  throw new Error("Please add  GOOGLE_CLIENT_ID  to .env.local")
}
if (!process.env.GOOGLE_CLIENT_SECRET){
  throw new Error("Please add  GOOGLE_CLIENT_SECRET  to .env.local")
}
if (!process.env.SECRET){
  throw new Error("Please add  SECRET  to .env.local")
}
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  session: {
    // maxAge: 60 * 24 * 60 * 60, // set cookie for 60 days, default is 30
    strategy: "jwt",
  },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  secret: process.env.SECRET,
});
