"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center w-20">Estado</div>,

    cell: ({ row }) => {
      const status = row.getValue<string>("status");
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
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Fecha creacion</div>,
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
