import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUsers } from "@/actions/users.action";

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold p-3">Usuarios</h2>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
export default UsersPage;
