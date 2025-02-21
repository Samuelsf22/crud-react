import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/features/user/userApi";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const CreateSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  username: z.string().min(2),
  password: z.string().min(6),
});

export default function EditUser() {
  const navigate = useNavigate();
  const { public_id } = useParams<{ public_id: string }>();
  const { data: user } = useGetUserByIdQuery(public_id ?? "");
  const [updateUser, { isError, isSuccess }] = useUpdateUserMutation();
  const form = useForm({
    resolver: zodResolver(CreateSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: "",
      });
    }
  }, [user, form]);

  const onSubmit = form.handleSubmit(() => {
    const first_name = form.getValues("first_name");
    const last_name = form.getValues("last_name");
    const username = form.getValues("username");
    const password = form.getValues("password");
    updateUser({
      public_id: public_id!,
      user: { first_name, last_name, username, password },
    });
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  if (!public_id) return null;

  return (
    <div className="h-screen flex items-center justify-center p-4 xl:p-0">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Edit</CardTitle>
          <CardDescription>Edit the user details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                name="first_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="last_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && (
                <FormMessage className="text-center">
                  Server error, please try again
                </FormMessage>
              )}
              {isSuccess && (
                <FormMessage className="text-center">Success</FormMessage>
              )}

              <footer className="flex justify-between">
                <Button type="submit" className="w-full">
                  Edit
                </Button>
              </footer>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
