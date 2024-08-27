"use client";

import { Monitor } from "@/types/monitor";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Monitor>[] = [
  {
    accessorKey: "nro_inventario",
    header: "Nro. Inventario",
  },
  {
    accessorKey: "nro_serie",
    header: "Nro. Serie",
  },
  {
    accessorKey: "lugar.nombre",
    header: "Lugar",
  },
  {
    accessorKey: "modelo.fabricante.nombre",
    header: "Fabricante",
  },
  {
    accessorKey: "modelo.nombre",
    header: "Modelo",
  },
  {
    accessorKey: "subtipo.nombre",
    header: "Tipo",
  },
  {
    accessorKey: "pulgadas",
    header: "Pulgadas",
  },
  {
    accessorKey: "estado.nombre",
    header: () => <div className="text-center w-20">Estado</div>,
    /* cell: ({ row }) => {
      const status = row.getValue<string>("estado");
      const capitalizedStatus = status[0].toUpperCase() + status.slice(1);
      return (
        <div
          className={`${
            capitalizedStatus === "Activo" ? "bg-green-700" : "bg-gray-600"
          } font-semibold rounded-xl text-center w-20`}
        >
          {capitalizedStatus}
        </div>
      );
    }, */
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Fecha Agregacion</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-center">
          {date.toLocaleDateString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  /* {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }, */
];
