-- DropForeignKey
ALTER TABLE "Dispositivo" DROP CONSTRAINT "Dispositivo_proveedorId_fkey";

-- AlterTable
ALTER TABLE "Dispositivo" ALTER COLUMN "proveedorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Estado" ALTER COLUMN "descripcion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lugar" ALTER COLUMN "encargado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Proveedor" ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "descripcion" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
