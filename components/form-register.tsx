"use client";

import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { registerUser } from "@/actions/auth.action";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransaction] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "", lastName: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError(null);
    startTransaction(async () => {
      const response = await registerUser(values);

      if (response.error) {
        setError(response.error);
      } else {
      }
    });
  };

  return (
    <div className="w-96 border border-neutral-700 rounded-xl p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su correo" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su apellido" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su contraseña" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            //disabled={isPending}
            className="w-full mt-5 bg-neutral-700 hover:bg-neutral-800"
          >
            Iniciar
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default FormRegister;
