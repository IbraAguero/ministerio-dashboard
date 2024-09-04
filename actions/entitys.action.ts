"use server";

import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const getEntityData = async (label: string, id: string) => {
  try {
    switch (label) {
      case "Lugar":
        return await db.lugar.findUnique({ where: { id } });
      case "Estado":
        return await db.estado.findUnique({ where: { id } });
      case "Fabricante":
        return await db.fabricante.findUnique({ where: { id } });
      case "Modelo":
        return await db.modelo.findUnique({ where: { id } });
      default:
        return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteEntityData = async (label: string, id: string) => {
  try {
    switch (label) {
      case "Lugar":
        await db.lugar.delete({ where: { id } });
        break;
      case "Estado":
        await db.estado.delete({ where: { id } });
        break;
      case "Fabricante":
        await db.fabricante.delete({ where: { id } });
        break;
      case "Modelo":
        await db.modelo.delete({ where: { id } });
        break;
      default:
        return null;
    }

    revalidatePath("/monitores/agregar");
    return { success: true };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: `No se puede eliminar el ${label} ya que existen relaciones a el.`,
      };
    } else {
      console.log("Error desconocido:", error);
    }
  }
};
