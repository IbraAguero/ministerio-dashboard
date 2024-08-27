"use server";

import { db } from "@/lib/db";
import { User } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
