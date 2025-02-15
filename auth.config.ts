import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/auth.schema";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("credenciales invalidas");
        }

        const user = await db.user.findUnique({ where: { email: data.email } });

        if (!user) {
          throw new Error("credenciales invalidas");
        }

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("credenciales invalidas");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
