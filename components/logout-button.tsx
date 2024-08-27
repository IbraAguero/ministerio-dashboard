"use client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };
  return (
    <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
      Cerrar sesion
    </DropdownMenuItem>
  );
};
export default LogoutButton;
