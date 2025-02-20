import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useLoginMutation } from "@/features/auth/authApi";

export default function Login() {
  const [login, { data, isError, isSuccess }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(() => {
    const username = form.getValues("username");
    const password = form.getValues("password");
    login({ username, password });

    if (isSuccess) {
      localStorage.setItem("auth_token", data.token);
    }
  });

  return (
    <div className="h-screen flex items-center justify-center p-4 xl:p-0">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
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
                  Invalid credentials
                </FormMessage>
              )}
              {isSuccess && (
                <FormMessage className="text-center">Success</FormMessage>
              )}

              <footer className="flex justify-between">
                <Link to="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Login</Button>
              </footer>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
