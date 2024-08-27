-- AlterTable
ALTER TABLE "Dispositivo" ADD COLUMN     "subtipoId" TEXT;

-- CreateTable
CREATE TABLE "SubtipoDispositivo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoDispositivo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubtipoDispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubtipoDispositivo_nombre_tipo_key" ON "SubtipoDispositivo"("nombre", "tipo");

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_subtipoId_fkey" FOREIGN KEY ("subtipoId") REFERENCES "SubtipoDispositivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
