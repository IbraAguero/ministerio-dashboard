"use client";
import { addMonitor } from "@/actions/monitors.action";
import { Combobox } from "@/components/combobox";
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
import { Dispositivo, Fabricante, Modelo } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormMonitor = ({ makers, places, states, models, subTypes }) => {
  const [filteredModels, setFilteredModels] = useState([]);
  const [error, setError] = useState<string | null>(null);
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
  useEffect(() => {
    if (maker) {
      const filtered = models.filter(
        (model: Modelo) => model.fabricanteId === maker
      );
      setFilteredModels(filtered);
      form.setValue("modeloId", "");
    } else {
      setFilteredModels([]);
    }
  }, [maker]);

  const onSubmit = async (values: z.infer<typeof monitorSchema>) => {
    setError(null);
    startTransaction(async () => {
      const response = await addMonitor(values);

      if (response?.error) {
        setError(response.error);
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
            <FormMessage>{error}</FormMessage>
            <h3 className="text-center text-lg font-semibold">
              Informacion Tecnica
            </h3>
            <div className="grid grid-cols-8 gap-4 p-5">
              <FormField
                control={form.control}
                name="nro_inventario"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Nro. Inventario</FormLabel>
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
                  <FormItem className="col-span-5">
                    <FormLabel>Nro. Serie</FormLabel>
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
                    <FormLabel>Fabricante</FormLabel>
                    <Combobox name="fabricanteId" data={makers} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modeloId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Modelo</FormLabel>
                    <Combobox
                      name="modeloId"
                      data={filteredModels}
                      disabled={!maker}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtipoId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Tipo</FormLabel>
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
                    <FormLabel>Pulgadas</FormLabel>
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
                    <FormLabel>Lugar</FormLabel>
                    <Combobox name="lugarId" data={places} />
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
                    <FormLabel>Estado</FormLabel>
                    <Combobox name="estadoId" data={states} />
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
