"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    id: "sno",
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    cell: ({ row }) => {
      const dateObj = new Date(row.original.createdAt);
      const date = dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const time = dateObj.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return `${date} - ${time}`;
    },
  },
  {
    accessorFn: (row) => row.user?.Name || row.user?.firstName,
    id: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row.user?.email || "No email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      const statusClass =
        status === "pending"
          ? "bg-yellow-200 text-yellow-800"
          : status === "processing"
          ? "bg-blue-200 text-blue-800"
          : status === "completed"
          ? "bg-green-200 text-green-800"
          : status === "cancelled"
          ? "bg-red-200 text-red-800"
          : "bg-green-200 text-green-800";

      return (
        <Badge className={`rounded-full text-sm font-medium  ${statusClass}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "user.city",
    header: "City",
  },
];
export const Inventorycolumns = [
  {
    accessorKey: "images", // Fixed typo
    header: "Product Image",
    cell: ({ row }) => (
      <Image
        src={row?.original?.images[0]}
        alt="Product Image"
        height={50}
        width={50}
        priority={true}
        style={{
          objectFit: "cover",
        }}
        className="w-26 h-16 rounded-xl"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: "Original Price",
  },
  {
    accessorKey: "Sellprice",
    header: "Sell Price",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
];
export const categoryColumns = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
];
