"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { userColumns } from "@/app/componensts/userColumns";
import { DataTable } from "@/app/componensts/userTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addeStaff, fetchStaff } from "@/app/actions/auth";

// Zod schema
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  role: z.enum(["member", "admin"], { required_error: "Role is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});

export default function Page() {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaff,
    refetchOnWindowFocus: false,
  });
  
  const mutation = useMutation({
    mutationFn: addeStaff,
    onSuccess: (data) => {
      form.reset();
      toast.success("User added successfully");
      queryClient.invalidateQueries("staff");
    },
    onError: (error) => {
      toast.error(`User added failed ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };


  return (
    <div className="p-4 w-[97%] mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <Card>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter user email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full md:w-fit mt-2 sm:mt-6" disabled={mutation.isLoading}>
               {mutation.isLoading ? "Loading" :  "Add User"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <DataTable columns={userColumns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
