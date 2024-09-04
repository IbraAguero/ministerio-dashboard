"use server";

import { db } from "@/lib/db";
import { TipoDispositivo } from "@prisma/client";

export const getSubtypes = async (type: TipoDispositivo) => {
  try {
    const subtypes = db.subtipoDispositivo.findMany({ where: { tipo: type } });

    return subtypes;
  } catch (error) {
    console.log(error);
  }
};
