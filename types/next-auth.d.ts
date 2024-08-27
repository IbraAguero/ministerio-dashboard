import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      userId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
