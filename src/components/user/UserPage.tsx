import { useGetAllUsersQuery } from "@/features/user/userApi";
import { UserColumns } from "./UserColumns";
import { UserTable } from "./UserTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function UserPage() {
  const { data, isError, isLoading } = useGetAllUsersQuery({});

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage users</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable columns={UserColumns} data={data} />
      </CardContent>
    </Card>
  );
}
