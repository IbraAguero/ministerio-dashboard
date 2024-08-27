export interface Monitor {
  id: string;
  nro_inventario: string;
  lugar: string;
  fabricante: string;
  modelo: string;
  tipo: string;
  pulgadas: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = "activo" | "inactivo";
