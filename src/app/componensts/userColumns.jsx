"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { deleteStaff, updateStaffRole } from "../actions/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const userColumns = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Button variant="outline" size="sm">
          {user.role}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const queryClient = useQueryClient();
        const deleteMutation = useMutation({
          mutationFn: deleteStaff,
          onSuccess: (data) => {
            toast.success(data.success || "Staff deleted successfully");
            queryClient.invalidateQueries("staff");
          },
          onError: (error) => {
            toast.error(`deleteStaff failed ${error.message}`);
          },
        });
      

      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteMutation.mutate({ id: user._id })}
        >
          <FaTrash className="mr-1" />
          Delete
        </Button>
      );
    },
  },
  {
    id: "preview",
    header: "Role",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const updateMutation = useMutation({
        mutationFn: async ({ status, id }) => {
          try {
            const result = await updateStaffRole({ status, id });
            return result;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries(["staff"]);
        },
        onError: (error) => {
          toast.error(error.message || "Status not updated");
        },
      });

      return (
        <div className="flex justify-center gap-10">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="text-black hover:underline">
                <PiDotsThreeCircleLight className="w-5 h-5" />
              </MenubarTrigger>
              <MenubarContent>
                {["member", "admin"].map((status) => (
                  <MenubarItem
                    key={status}
                    onClick={() =>
                      updateMutation.mutate({ status: status, id: row.original._id })
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      );
    },
  },
];
