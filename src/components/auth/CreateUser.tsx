import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useCreateUserMutation } from "@/features/auth/authApi";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

const CreateSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  username: z.string().min(2),
  password: z.string().min(6),
});

export default function CreateUser() {
  const navigate = useNavigate();

  const [createUser, { data, isError, isSuccess }] = useCreateUserMutation();

  const form = useForm({
    resolver: zodResolver(CreateSchema),
  });

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("auth_token", data.token);
      navigate("/");
    }
  }, [isSuccess, data, navigate]);

  const onSubmit = form.handleSubmit(() => {
    const first_name = form.getValues("first_name");
    const last_name = form.getValues("last_name");
    const username = form.getValues("username");
    const password = form.getValues("password");
    createUser({ first_name, last_name, username, password });
  });

  return (
    <div className="h-screen flex items-center justify-center p-4 xl:p-0">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your credentials to create an account
          </CardDescription>
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
                  Login
                </Button>
              </footer>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
