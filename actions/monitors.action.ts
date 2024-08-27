"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { monitorSchema } from "@/schemas/monitor.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addMonitor = async (values: z.infer<typeof monitorSchema>) => {
  try {
    const { data, success } = monitorSchema.safeParse(values);

    const session = await auth();

    if (!success) {
      return {
        error: "Datos invalidos",
      };
    }

    if (!session?.user?.userId) {
      return {
        error: "Usuario no autenticado",
      };
    }

    const monitor = await db.dispositivo.findUnique({
      where: { nro_inventario: data.nro_inventario, nro_serie: data.nro_serie },
    });

    if (monitor) {
      return {
        error: "El monitor ya existe",
      };
    }

    if (data) {
      const newMonitor = await db.dispositivo.create({
        data: {
          nro_inventario: data.nro_inventario,
          nro_serie: data.nro_serie,
          tipo: "monitor",

          usuarioId: session.user.userId,

          pulgadas: data.pulgadas,
          modeloId: data.modeloId,
          estadoId: data.estadoId,
          lugarId: data.lugarId,
          subtipoId: data.subtipoId,

          proveedorId: data.proveedorId || null,
          remito: data.remito,
          comentario: data.comentario,
        },
      });

      revalidatePath("/monitores");
      return {
        success: true,
        message: "Monitor agregado correctamente",
        data: newMonitor,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMonitors = async () => {
  try {
    const monitors = await db.dispositivo.findMany({
      where: { tipo: "monitor" },
      orderBy: { createdAt: "asc" },
      include: {
        lugar: true,
        estado: true,
        subtipo: true,
        modelo: { include: { fabricante: true } },
      },
    });

    return monitors;
  } catch (error) {
    console.log(error);
  }
};

export const getMakersMonitors = async () => {
  try {
    const makers = db.fabricante.findMany({
      where: { tipo: "monitor" },
    });
    return makers;
  } catch (error) {
    console.log(error);
  }
};

export const getModelsMonitors = async () => {
  try {
    const models = db.modelo.findMany({
      where: { fabricante: { tipo: "monitor" } },
    });
    return models;
  } catch (error) {
    console.log(error);
  }
};

export const getSubTypesMonitors = async () => {
  try {
    const models = db.subtipoDispositivo.findMany({
      where: { tipo: "monitor" },
    });
    return models;
  } catch (error) {
    console.log(error);
  }
};

// MOVERLOS DE ARCHIVO

export const getPlaces = async () => {
  try {
    const places = await db.lugar.findMany();
    return places;
  } catch (error) {
    console.log(error);
  }
};
export const getStates = async () => {
  try {
    const states = await db.estado.findMany();
    return states;
  } catch (error) {
    console.log(error);
  }
};
