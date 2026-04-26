"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrderStatus } from "../actions/products";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { OrderReceiptPDF } from "../componensts/OrderReceipt";
import { Printer } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Package } from "lucide-react";
import { Badge } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { User } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Clock1 } from "lucide-react";

export function DataTable({ columns, data, isLoading }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Clock1 className="w-3 h-3" />,
          label: "Pending",
        };
      case "processing":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Loader2Icon className="w-3 h-3" />,
          label: "Processing",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Completed",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="w-3 h-3" />,
          label: status,
        };
    }
  };
  const statusConfig = getStatusConfig(selectedOrder?.status || "");

  const mutation = useMutation({
    mutationFn: async ({ status, id, orderId, email }) => {
      try {
        const result = await updateOrderStatus({ status, id, orderId, email });
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(error.message || "Status not updated");
    },
  });

  const previewColumn = {
    id: "preview",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-center gap-10">
        <Button
          onClick={() => handlePreview(row.original)}
          className="text-black hover:underline "
          variant="ghost"
        >
          <Eye className="w-5 h-5" />
        </Button>
        <PDFDownloadLink
          document={<OrderReceiptPDF order={row.original} />}
          fileName={`Order-${row.original?.orderId}.pdf`}
        >
          {({ loading }) => (
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-black" />
            </Button>
          )}
        </PDFDownloadLink>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="text-black hover:underline">
              <PiDotsThreeCircleLight className="w-5 h-5" />
            </MenubarTrigger>
            <MenubarContent>
              {[
                "pending",
                "processing",
                "completed",
                "cancelled",
                "shipped",
                "delete",
              ].map((status) => (
                <MenubarItem
                  key={status}
                  onClick={() =>
                    mutation.mutate({
                      status: status,
                      id: row.original._id,
                      orderId: row.original.orderId,
                      email: row.original.user.email,
                    })
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    ),
  };

  const updatedColumns = [...columns, previewColumn];

  const table = useReactTable({
    data,
    columns: updatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handlePreview(rowData) {
    setOpen(true);
    setSelectedOrder(rowData);
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isLoading ? (
            <TableRow>
              <TableCell
                colSpan={updatedColumns.length}
                className="h-24 text-center"
              >
                <Skeleton className={"w-full"} />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={updatedColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center bg-gray-100">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[98vw] max-w-5xl max-h-[90vh] p-0">
            <DialogHeader className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                  Order Details
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={`${statusConfig.color} border font-medium`}
                >
                  <span className="flex items-center gap-1">
                    {statusConfig.icon}
                    {statusConfig.label}
                  </span>
                </Badge>
              </div>
            </DialogHeader>

            {selectedOrder && (
              <ScrollArea className="max-h-[calc(90vh-120px)]">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Customer Information */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-gray-900">
                              {selectedOrder.user?.firstName &&
                              selectedOrder.user?.lastName
                                ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}`
                                : selectedOrder.user?.Name || "No name"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-medium text-gray-900">
                              {selectedOrder.user?.contact || "No contact"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-gray-900">
                              {selectedOrder.user?.address || "No address"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedOrder.user?.country || "No country"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(
                                selectedOrder?.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      Order Items ({selectedOrder?.items?.length || 0})
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-lg border"
                        >
                          <Image
                            src={
                              item?.productId?.images[0] || "/placeholder.svg"
                            }
                            height={64}
                            width={64}
                            priority
                            alt={item?.productId?.name || "Product"}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-200"
                          />
                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                              {item.productId?.name.length > 27
                                ? item.productId?.name.slice(0, 27) + "..."
                                : item.productId?.name || "Unknown Product"}
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                              <span className="text-xs sm:text-sm text-gray-500">
                                Quantity: {item?.quantity}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                                •
                              </span>
                              <span className="text-xs sm:text-sm font-medium text-gray-900">
                                Rs.{" "}
                                {item.productId?.Sellprice?.toLocaleString(
                                  "en-PK"
                                ) || "N/A"}
                              </span>
                              <span className="text-xs sm:text-sm font-medium text-gray-900">
                                {item?.selectedVariant && (
                                  <div
                                    className={`h-fit py-1 px-3 cursor-pointer 
                          bg-black text-white rounded-full w-fit border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}
                                  >
                                    <h4 className="font-semibold text-xs">
                                      {item?.selectedVariant}
                                    </h4>
                                  </div>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              Rs.{" "}
                              {(
                                (item.productId?.Sellprice || 0) * item.quantity
                              ).toLocaleString("en-PK")}
                            </p>
                            <p className="text-xs text-gray-500">Total</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          Order Total
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Including Delivery Charges
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-blue-600">
                          Rs.{" "}
                          {selectedOrder.totalAmount?.toLocaleString("en-PK") ||
                            "No totalAmount"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
