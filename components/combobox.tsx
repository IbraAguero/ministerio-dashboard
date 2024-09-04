import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  name: string;
  data: Array<{ id: string; nombre: string }>;
  disabled?: boolean;
}

export function Combobox({ name, data, disabled = false }: ComboboxProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-white/70 font-normal"
            disabled={disabled}
          >
            {value
              ? data.find((element) => element.id === value)?.nombre
              : "Elige un elemento"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar elemento..." className="h-9" />
            <CommandList>
              <CommandEmpty className="py-4 text-center text-sm ">
                <span>No se encontro el elemento</span>
              </CommandEmpty>
              <CommandGroup>
                {data.map((element) => (
                  <CommandItem
                    key={element.nombre}
                    value={element.nombre}
                    onSelect={() => {
                      onChange(element.id);
                      setOpen(false);
                    }}
                  >
                    {element.nombre}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === element.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
