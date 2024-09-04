"use server";

import { db } from "@/lib/db";
import { Lugar } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getPlaces = async () => {
  try {
    const places = await db.lugar.findMany();
    return places;
  } catch (error) {
    console.log(error);
  }
};

export const getPlace = async (id: string) => {
  try {
    const place = await db.lugar.findUnique({ where: { id: id } });
    return place;
  } catch (error) {
    console.log(error);
  }
};

export const addPlace = async (values: Lugar) => {
  try {
    if (values.id) {
      await db.lugar.update({
        where: { id: values.id },
        data: { nombre: values.nombre, encargado: values.encargado },
      });
    } else {
      await db.lugar.create({
        data: { nombre: values.nombre, encargado: values.encargado },
      });
    }

    revalidatePath("/monitores/agregar");
    return {
      success: true,
      message: "Se agrego correctamente",
    };
  } catch (error) {
    console.log(error);
  }
};
