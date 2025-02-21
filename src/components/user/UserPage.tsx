import { useGetAllUsersQuery } from "@/features/user/userApi";
import { UserColumns } from "./UserColums";
import { UserTable } from "./UserTable";

export default function UserPage() {
  const { data, isError, isLoading } = useGetAllUsersQuery({});

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  console.log(data);

  return (
    <div>
      <h1>Users</h1>
      <UserTable columns={UserColumns} data={data} />
    </div>
  );
}
