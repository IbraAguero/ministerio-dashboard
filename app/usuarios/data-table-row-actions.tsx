import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { User } from "@/types/user";
import { useState } from "react";

export const DataTableRowActions = ({ row }: { row: Row<User> }) => {
  //const [openModal, setOpenModal] = useState(false);
  //const ingredient = row.original;
  //const router = useRouter();

  const handleEdit = async () => {
    //router.push(`ingredientes/editar/${ingredient.id}`);
  };

  const handleDelete = async () => {
    //setOpenModal(true);
  };

  return (
    <div className="min-w-2 max-w-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Abrir opciones</span>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Dar de baja
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
