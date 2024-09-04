"use server";

import { db } from "@/lib/db";
import { Fabricante, TipoDispositivo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getMakers = async (type: TipoDispositivo) => {
  try {
    const makers = await db.fabricante.findMany({ where: { tipo: type } });

    return makers;
  } catch (error) {
    console.log(error);
  }
};

export const addMaker = async (values: Fabricante) => {
  try {
    let result;
    if (values.id) {
      result = await db.fabricante.update({
        where: {
          id: values.id,
        },
        data: { nombre: values.nombre },
      });
    } else {
      result = await db.fabricante.create({
        data: { nombre: values.nombre, tipo: values.tipo },
      });
    }

    revalidatePath("/monitores/agregar");
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, data: {} };
  }
};
