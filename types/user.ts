export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  image: string | null;
  role: Role;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type Role = "usuario" | "admin";
export type Status = "activo" | "inactivo";
