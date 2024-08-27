import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import UserNav from "./user-nav";
import { auth } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <nav className="w-full border-b">
      <div className="border-b p-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Inventario Ministerio</h1>
        </Link>
        <UserNav user={session.user} />
      </div>
      <div className="flex justify-center gap-10 p-3 font-semibold ">
        <Link
          href="/monitores"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Monitores
        </Link>
        <Link
          href="/computadoras"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Computadoras
        </Link>
        <Link
          href="/impresoras"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Impresoras
        </Link>
        <Link
          href="/perifericos"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Perifericos
        </Link>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </nav>
  );
};
export default Navbar;
