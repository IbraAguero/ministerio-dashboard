"use server";

import { db } from "@/lib/db";
import { Modelo, TipoDispositivo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getModels = async (type: TipoDispositivo) => {
  try {
    const models = db.modelo.findMany({
      where: { fabricante: { tipo: type } },
    });

    return models;
  } catch (error) {
    console.log(error);
  }
};

export const addModels = async (values: Modelo) => {
  try {
    let result;
    if (values.id) {
      result = await db.modelo.update({
        where: { id: values.id },
        data: { nombre: values.nombre },
      });
    } else {
      result = await db.modelo.create({
        data: { nombre: values.nombre, fabricanteId: values.fabricanteId },
      });
    }

    revalidatePath("/monitores/agregar");
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, data: {} };
  }
};
