"use client";
import { addMonitor } from "@/actions/device.action";
import { deleteEntityData } from "@/actions/entitys.action";
import { addMaker } from "@/actions/makers.action";
import { addModels } from "@/actions/models.action";
import { addPlace } from "@/actions/place.action";
import { addState } from "@/actions/state.action";
import { Combobox } from "@/components/combobox";
import DialogForm from "@/components/dialog-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { monitorSchema } from "@/schemas/monitor.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modelo } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormMonitor = ({ makers, places, states, models, subTypes }) => {
  const [filteredModels, setFilteredModels] = useState([]);
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof monitorSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(monitorSchema),
    defaultValues: {
      fabricanteId: "",
      modeloId: "",
      nro_inventario: "",
      subtipoId: "",
      nro_serie: "",
      estadoId: "",
      lugarId: "",
      remito: "",
      encargado: "",
      proveedorId: "",
      pulgadas: undefined,
      comentario: "",
    },
  });

  const maker = form.watch("fabricanteId");
  const prevMakerRef = useRef(maker);

  useEffect(() => {
    if (maker) {
      const filtered = models.filter(
        (model: Modelo) => model.fabricanteId === maker
      );
      setFilteredModels(filtered);
      if (maker !== prevMakerRef.current) {
        form.setValue("modeloId", "");
        prevMakerRef.current = maker;
      }
    } else {
      setFilteredModels([]);
    }
  }, [maker, models]);

  const onSubmit = async (values: z.infer<typeof monitorSchema>) => {
    startTransaction(async () => {
      const response = await addMonitor(values);

      if (response?.error) {
        toast.error("Error al enviar", { description: response.error });
      }

      if (response?.success) {
        router.push("/monitores");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between pt-8 gap-8">
          <div className="flex-1">
            <h3 className="text-center text-lg font-semibold">
              Informacion Tecnica
            </h3>
            <div className="grid grid-cols-8 gap-4 p-5">
              <FormField
                control={form.control}
                name="nro_inventario"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Nro. Inventario (*)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nro. de inventario"
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
                name="nro_serie"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Nro. Serie (*)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nro. de serie"
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
                name="fabricanteId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Fabricante (*)</FormLabel>
                    <div className="flex gap-1">
                      <Combobox name="fabricanteId" data={makers} />
                      <DialogForm
                        field={field}
                        label="Fabricante"
                        onSubmit={addMaker}
                        values={{ tipo: "monitor" }}
                        deleteOption={deleteEntityData}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modeloId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Modelo (*)</FormLabel>
                    <div className="flex gap-1">
                      <Combobox
                        name="modeloId"
                        data={filteredModels}
                        disabled={!maker}
                      />
                      <DialogForm
                        label="Modelo"
                        field={field}
                        onSubmit={addModels}
                        deleteOption={deleteEntityData}
                        values={{ fabricanteId: maker }}
                        disabled={!maker}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtipoId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Tipo (*)</FormLabel>
                    <Combobox name="subtipoId" data={subTypes} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pulgadas"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Pulgadas (*)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingrese las pulgadas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-center text-lg font-semibold">
              Informacion Adicional
            </h3>
            <div className="grid grid-cols-8 gap-4 p-5">
              <FormField
                control={form.control}
                name="lugarId"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <FormLabel>Lugar (*)</FormLabel>
                    <div className="flex gap-1">
                      <Combobox
                        name="lugarId"
                        data={places}
                        onSubmit={addPlace}
                      />
                      <DialogForm
                        label="Lugar"
                        onSubmit={addPlace}
                        field={field}
                        deleteOption={deleteEntityData}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="encargado"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Encargado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el encargado"
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
                name="estadoId"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <FormLabel>Estado (*)</FormLabel>
                    <div className="flex gap-1">
                      <Combobox name="estadoId" data={states} />
                      <DialogForm
                        label="Estado"
                        field={field}
                        deleteOption={deleteEntityData}
                        onSubmit={addState}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remito"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Remito</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el remito"
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
                name="comentario"
                render={({ field }) => (
                  <FormItem className="col-span-8">
                    <FormLabel>Comentario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el comentario"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <Link
            href="/monitores"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>
          <Button type="submit" disabled={isPending}>
            Agregar
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FormMonitor;
