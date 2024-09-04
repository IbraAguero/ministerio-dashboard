import { z } from "zod";

export const monitorSchema = z.object({
  nro_inventario: z
    .string()
    .regex(/^MO-\d+$/, {
      message: "Debe comenzar con 'MO-' seguido de números",
    })
    .min(1, { message: "El nro. de inventario es requerido" }),
  nro_serie: z.string().min(1, { message: "El nro. de serie es requerido" }),
  modeloId: z.string().min(1, { message: "El modelo es requerido" }),
  fabricanteId: z.string().min(1, { message: "El fabricante es requerido" }),
  subtipoId: z.string().min(1, { message: "El tipo es requerido" }),
  lugarId: z.string().min(1, { message: "El lugar es requerido" }),
  estadoId: z.string().min(1, { message: "El estado es requerido" }),
  pulgadas: z.coerce
    .number({ message: "Las pulgadas son requeridas" })
    .min(1, { message: "Las pulgadas son requeridas" }),
  encargado: z.string().optional(),
  proveedorId: z.string().optional(),
  remito: z.string().optional(),
  comentario: z.string().optional(),
});
