"use server";

import { db } from "@/lib/db";
import { Estado } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getStates = async () => {
  try {
    const states = await db.estado.findMany();
    return states;
  } catch (error) {
    console.log(error);
  }
};

export const addState = async (values: Estado) => {
  try {
    let result;
    if (values.id) {
      result = await db.estado.update({
        where: { id: values.id },
        data: { nombre: values.nombre, descripcion: values.descripcion },
      });
    } else {
      result = await db.estado.create({
        data: { nombre: values.nombre, descripcion: values.descripcion },
      });
    }

    revalidatePath("/monitores/agregar");
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: {},
    };
  }
};
