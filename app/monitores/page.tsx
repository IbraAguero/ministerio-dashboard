import { Button, buttonVariants } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { getDevices } from "@/actions/device.action";

const MonitorsPage = async () => {
  const monitors = await getDevices("monitor");

  return (
    <section className="container mt-10 p-6">
      <div className="flex justify-between rounded mb-4">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-semibold">Monitores</h2>
          <Link href="monitores/agregar" className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <div>
          <Button className="bg-green-600 hover:bg-green-700">Exportar</Button>
        </div>
      </div>
      <DataTable columns={columns} data={monitors} />
    </section>
  );
};
export default MonitorsPage;
