"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { monitorSchema } from "@/schemas/monitor.schema";
import { TipoDispositivo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getDevices = async (type: TipoDispositivo) => {
  try {
    const devices = await db.dispositivo.findMany({
      where: { tipo: type },
      orderBy: { createdAt: "asc" },
      include: {
        lugar: true,
        estado: true,
        subtipo: true,
        modelo: { include: { fabricante: true } },
      },
    });

    return devices;
  } catch (error) {
    console.log(error);
  }
};

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

    const existingMonitor = await db.dispositivo.findFirst({
      where: {
        OR: [
          { nro_inventario: data.nro_inventario },
          { nro_serie: data.nro_serie },
        ],
      },
    });

    if (existingMonitor) {
      return {
        error: "El número de inventario o el número de serie ya está en uso.",
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
