import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authConfig = {
  providers: [Google, LinkedIn],
  adapter: PrismaAdapter(prisma),
  debug: true,
  pages: {
    signIn: "/login",
  },
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   // const isLoggedIn = !!auth?.user;
    //   // const isOnDashboard = nextUrl.pathname.startsWith("/posts");
    //   // if (isOnDashboard) {
    //   //   if (isLoggedIn) return true;
    //   //   return false; // Redirect unauthenticated users to login page
    //   // } else if (isLoggedIn) {
    //   //   return Response.redirect(new URL("/posts", nextUrl));
    //   // }
    //   // return true;
    // },
  },
} satisfies NextAuthConfig;
