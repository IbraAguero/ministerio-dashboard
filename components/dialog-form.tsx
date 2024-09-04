import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { getEntityData } from "@/actions/entitys.action";
import { Input } from "./ui/input";
import DialogAlertDelete from "./dialog-alert-delete";
import {
  EstadoSchema,
  FabricanteSchema,
  LugarSchema,
  ModeloSchema,
  SubtipoDispositivoSchema,
} from "@/schemas/entity.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type FormValues =
  | z.infer<typeof FabricanteSchema>
  | z.infer<typeof ModeloSchema>
  | z.infer<typeof EstadoSchema>
  | z.infer<typeof LugarSchema>
  | z.infer<typeof SubtipoDispositivoSchema>;

interface DialogFormInterface {
  field: {
    name: string;
    value: string;
  };
  label: string;
  values: {};
  onSubmit: (values: FormValues) => {
    data: FormValues;
    success: boolean;
  };
  deleteOption: (
    label: string,
    id: string
  ) => { success: boolean; message: string };
  disabled?: boolean;
}

const getFormSchema = (label: string) => {
  switch (label) {
    case "Lugar":
      return LugarSchema;
    case "Estado":
      return EstadoSchema;
    case "Modelo":
      return ModeloSchema;
    case "Fabricante":
      return FabricanteSchema;
    case "SubtipoDispositivo":
      return SubtipoDispositivoSchema;
    default:
      return z.object({});
  }
};

const DialogForm = ({
  field,
  label,
  values,
  onSubmit,
  deleteOption,
  disabled = false,
}: DialogFormInterface) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(label)),
  });

  const formMain = useFormContext();

  useEffect(() => {
    const getFieldValue = async () => {
      if (field.value && editMode) {
        const data = await getEntityData(label, field.value);

        if (data) {
          form.reset(data);
        }
      }
    };

    getFieldValue();
  }, [field.value, label, editMode]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    form.reset({});
  };
  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const handleAdd = () => {
    form.reset({ ...values });
    setEditMode(false);
    openModal();
  };

  const handleEdit = () => {
    setEditMode(true);
    openModal();
  };

  const handleDelete = () => {
    setModalDelete(true);
  };

  const handleSubmitForm = async (values: FormValues) => {
    const { data, success } = await onSubmit(values);
    if (success) {
      console.log(field.name);
      console.log(data.id);

      formMain.setValue(field.name, data.id);
      closeModal();
      setEditMode(false);
    }
  };

  const handleSubmitDelete = async () => {
    const data = await deleteOption(label, field.value);
    if (data.success) {
      formMain.setValue(field.name, "");
    } else {
      toast.error("Se produjo un error", { description: data.message });
    }
    closeModalDelete();
  };

  const renderFields = () => {
    switch (label) {
      case "Lugar":
        return (
          <>
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="encargado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Encargado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre del encargado"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Estado":
        return (
          <>
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese una descripcion"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      case "Modelo":
      case "Fabricante":
        return (
          <>
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            type="button"
            disabled={disabled}
          >
            <Plus width={17} height={17} color="gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={handleAdd}>Agregar</DropdownMenuItem>
          {field.value && (
            <>
              <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Eliminar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={modal} onOpenChange={closeModal} modal={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Editar" : "Agregar"} {label}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form>
              {renderFields()}

              <DialogFooter>
                <Button onClick={form.handleSubmit(handleSubmitForm)}>
                  {editMode ? "Editar" : "Agregar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DialogAlertDelete
        onSubmit={handleSubmitDelete}
        open={modalDelete}
        handleClose={closeModalDelete}
      />
    </>
  );
};
export default DialogForm;
