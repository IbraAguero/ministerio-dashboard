"use server";

import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerUser = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return { error: "Datos invalidos" };
    }

    // Verificar si el usuario ya existe
    const user = await db.user.findUnique({ where: { email: data.email } });
    if (user) {
      return { error: "El usuario ya existe" };
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Crear el usuario
    const newUser = await db.user.create({
      data: {
        email: data.email.toLowerCase(),
        name: data.name,
        lastName: data.lastName,
        password: passwordHash,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return {
      success: true,
      message: "Usuario creado exitosamente",
      user: newUser,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: "error 500" };
  }
};
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    console.log(error);

    return { error: "error 500" };
  }
};
