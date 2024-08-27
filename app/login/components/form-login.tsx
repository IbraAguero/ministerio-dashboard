"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/input";
import { loginSchema } from "@/schemas/auth.schema";
import { loginAction } from "@/actions/auth.action";
import { z } from "zod";

const FormLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);
    startTransaction(async () => {
      const response = await loginAction(values);

      if (response.error) {
        setError(response.error);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="w-96 border border-neutral-700 rounded-xl p-10">
      <Form {...form}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
            name="password"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su contraseña"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>{error}</FormMessage>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-5 bg-neutral-700 hover:bg-neutral-800"
          >
            Iniciar
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default FormLogin;
