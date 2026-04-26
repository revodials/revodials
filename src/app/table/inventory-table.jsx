"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiDotsThreeCircle } from "react-icons/pi";
import {
  addProducts,
  deleteProducts,
  HandleImageUpload,
  hideProducts,
  restoreProducts,
} from "../actions/products";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Editdialog from "../componensts/edit-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tiptap from "../componensts/text-editor";
import { categoryColumns } from "./columns";
import { CategoryTable } from "./category-table";
import { Trash } from "lucide-react";

export function InventoryTable({ columns, data, totalDocs, catagory }) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [editState, setEditState] = useState(false);
  const [addProductModel, setAddProductModel] = useState(false);
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (!text) return toast.error(`Please enter Variants`);
    setItems([...items, text ]);
    setText("");
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const previewColumn = {
    id: "preview",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <PiDotsThreeCircle className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {row.original.status == "active" ? (
              <>
                <DropdownMenuItem onClick={() => handlePreview(row.original)}>
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEditState(true);
                    setSelectedOrder(row.original);
                  }}
                >
                  Edit
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    deleteMutation.mutate(row.original._id);
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    hideMutation.mutate(row.original._id);
                  }}
                >
                  Hide
                  <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    restoreMutation.mutate(row.original._id);
                  }}
                >
                  Restore
                  <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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

  const mutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      setImages([]);
      reset();
      setAddProductModel(false);
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries("catagory");
    },
    onError: (error) => {
      toast.error(`Product not added successfully! ${error.message}`);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
  const hideMutation = useMutation({
    mutationFn: hideProducts,
    onSuccess: () => {
      toast.success("Product hidden successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
  const restoreMutation = useMutation({
    mutationFn: restoreProducts,
    onSuccess: () => {
      toast.success("Product restored successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const onSubmit = async (data) => {
    data.variants = items;
    data.images = images;
    data.mainCategory= "All-products";
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[97%] mx-auto lg:px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col-reverse md:flex-row items-start justify-between md:items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Products({totalDocs})
        </h1>
        <Button onClick={() => setAddProductModel(true)}>Add Product</Button>
      </div>

      {/* Table Section */}
      <Table className="bg-white rounded-xl border shadow-sm mt-2">
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
                className="hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={updatedColumns.length}
                className="text-center py-8 text-gray-500"
              >
                No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Product Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <ScrollArea className={"h-[80vh] "}>
            <DialogHeader>
              <DialogTitle className={"mb-2"}>Product Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4 text-gray-700">
                {selectedOrder.images ? (
                  <Image
                    src={selectedOrder?.images[0]}
                    alt="Product Image"
                    width={500}
                    height={300}
                    priority
                    className="rounded-lg object-cover w-full h-60"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div>
                  <span className="font-semibold">Product Name:</span>{" "}
                  <p>{selectedOrder?.name}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Description:</p>
                  <div
                    className="text-sm text-gray-700 prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: selectedOrder?.description,
                    }}
                  />
                </div>

                <div>
                  <span className="font-semibold">Price:</span>{" "}
                  <p>{selectedOrder?.price}</p>
                </div>
                <div>
                  <span className="font-semibold">Sellprice:</span>{" "}
                  <p>{selectedOrder?.Sellprice}</p>
                </div>
                <div>
                  <span className="font-semibold">Stock:</span>{" "}
                  <p>{selectedOrder?.stock}</p>
                </div>
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  <p>{new Date(selectedOrder?.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog
        open={addProductModel}
        onOpenChange={(open) => {
          setAddProductModel(open);
          if (!open) {
            reset();
            setImages([]);
          }
        }}
      >
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <div className="bg-white rounded-lg">
            <div className="border-b border-gray-100 px-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Add New Product
                </DialogTitle>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <ScrollArea className="h-[70vh] w-full px-6">
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <Input
                        {...register("name", {
                          required: "Product name is required",
                        })}
                        placeholder="Enter product name"
                        className="bg-gray-50 border-gray-200 focus-visible:ring-blue-200"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <Input
                        {...register("stock", {
                          required: "Stock is required",
                        })}
                        type="number"
                        placeholder="Enter stock quantity"
                        className="bg-gray-50 border-gray-200 focus-visible:ring-blue-200"
                      />
                      {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <CategoryTable columns={categoryColumns} />
                  </div>
                  {/* Description */}
                  <div>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => <Tiptap {...field} />}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div className="grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Category
                      </label>
                      <div className="space-y-3">
                        <Select
                          onValueChange={(value) => setValue("category", value)}
                          defaultValue="category"
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-100 shadow-lg">
                            {catagory.data?.map((cat) => (
                              <SelectItem
                                key={cat._id}
                                value={cat._id}
                                className="hover:bg-gray-50"
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Price
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          Rs
                        </span>
                        <Input
                          {...register("price", {
                            required: "Price is required",
                          })}
                          type="number"
                          placeholder="0.00"
                          className="bg-gray-50 border-gray-200 pl-8"
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Selling Price
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          Rs
                        </span>
                        <Input
                          {...register("Sellprice", {
                            required: "Sell price is required",
                          })}
                          type="number"
                          placeholder="0.00"
                          className="bg-gray-50 border-gray-200 pl-8"
                        />
                      </div>
                      {errors.Sellprice && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.Sellprice.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* variants */}

                  <div className="max-w-[50%] ">
                    <h1 className="text-md font-semibold py-2">Variants</h1>
                    <div className="space-y-4 flex items-start gap-4">
                      <Input
                        placeholder="Enter Color eg: Red, Blue"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={"flex-1"}
                      />

                      <Button onClick={handleAdd} type="button">
                        Add
                      </Button>
                    </div>

                    {/* LIST OF ITEMS */}
                    <div className="flex flex-wrap items-center gap-2">
                      {items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 px-3 py-1.5 rounded-full border bg-white shadow-sm
              dark:bg-neutral-900 dark:border-neutral-700 transition"
                        >
                          {/* Text */}
                          <p className="font-medium text-sm text-foreground">
                            {item}
                          </p>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              const updated = items?.filter(
                                (_, i) => i !== index
                              );
                              setItems(updated);
                            }}
                            type="button"
                            className="p-1 cursor-pointer rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                          >
                            <Trash className="size-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* variant end */}

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image
                    </label>
                    <div className="mt-1">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-600 text-center">
                            <span className="font-bold">Click to upload</span>{" "}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                        <input
                          id="image-upload"
                          {...register("image", {
                            required: "Select an image",
                          })}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            if (e) {
                              setImages((prev) => [
                                ...prev,
                                ...Array.from(e.target.files || []),
                              ]);
                            }
                          }}
                        />
                      </label>
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.image.message}
                        </p>
                      )}
                    </div>

                    {/* Image Preview */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={URL.createObjectURL(img)}
                            alt={`Preview ${index + 1}`}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages = images.filter(
                                (_, i) => i !== index
                              );
                              setImages(updatedImages);
                            }}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                            aria-label="Remove image preview"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Dialog Footer */}
              <div className="border-t border-gray-100 px-6 py-2 bg-gray-50 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setAddProductModel(false);
                    reset();
                  }}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
                >
                  {mutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Product Dialog */}
      <Editdialog
        open={editState}
        onOpenChange={setEditState}
        seletedata={selectedOrder}
        catagory={catagory}
      />
    </div>
  );
}
