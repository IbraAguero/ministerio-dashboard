import { z } from "zod";

export const TipoDispositivoEnum = z.enum([
  "impresora",
  "monitor",
  "periferico",
  "red",
]);

// Esquema para SubtipoDispositivo
export const SubtipoDispositivoSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  tipo: TipoDispositivoEnum,
});

// Esquema para Lugar
export const LugarSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  encargado: z.string().optional(),
});

// Esquema para Estado
export const EstadoSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  descripcion: z.string().optional(),
});

// Esquema para Proveedor
export const ProveedorSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  telefono: z.number().int().optional(),
  descripcion: z.string().optional(),
});

// Esquema para Fabricante
export const FabricanteSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  tipo: TipoDispositivoEnum,
});

// Esquema para Modelo
export const ModeloSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string(),
  fabricanteId: z.string().uuid(),
});
