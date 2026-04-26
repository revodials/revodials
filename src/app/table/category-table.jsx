"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { CircleAlertIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { addCategory, deleteCategory, editCategory } from "../actions/category";
import { toast } from "sonner";
import { fetchCatagory } from "../actions/products";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function CategoryTable({ columns }) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 3;

  function openAddCategoryModal() {
    setInputValue("");
    setAddModalOpen(true);
  }

  const queryClient = useQueryClient();
  const previewColumn = {
    id: "edit",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 sm:gap-22">
        <div className="flex justify-center gap-6">
          <Pencil
            size={18}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => handlePreview(row.original?._id, "edit")}
          />
          <Trash2
            size={18}
            className="cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => handlePreview(row.original?._id, "delete")}
          />
        </div>
      </div>
    ),
  };
  function handlePreview(id, mode) {
    setDialogMode(mode);
    setSelectedRowId(id);
    setOpen(true);
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ["catagory"],
    queryFn: fetchCatagory,
    refetchOnWindowFocus: false,
  });

  const updatedColumns = [...columns, previewColumn];

  const table = useReactTable({
    data,
    columns: updatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const editCategoryMutation = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      toast.success("Category edited successfully!");
      queryClient.invalidateQueries("catagory");
    },
    onError: (error) => {
      console.error("Error editing category:", error);
    },
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries("catagory");
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries("catagory");
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });

  return (
    <>
      {/* add category modal */}
      <div>
        <Button type="button" onClick={openAddCategoryModal} className="mb-4">
          Add Category
        </Button>

        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogContent className="w-full max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Enter category name below:</DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Category Name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  if (!inputValue) {
                    toast.error("Category name is required");
                    return;
                  }
                  addCategoryMutation.mutate({ value: inputValue });
                  setAddModalOpen(false);
                }}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* edit and delete category modal */}
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-full p-2 max-w-[500px]">
            {dialogMode === "edit" && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Confirmation</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to Edit category
                  </DialogDescription>
                </DialogHeader>
                {/* Add your edit form here */}
                <Input
                  placeholder="Category Name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!inputValue) {
                        toast.error("Category name cannot be empty");
                        return;
                      }
                      editCategoryMutation.mutate({
                        id: selectedRowId,
                        value: inputValue,
                      });
                      setOpen(false);
                      setInputValue("");
                    }}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </>
            )}

            {dialogMode === "delete" && (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <DialogHeader>
                    <DialogTitle className="sm:text-center">
                      Delete Confirmation
                    </DialogTitle>
                    <DialogDescription className="sm:text-center">
                      Are you sure you want to delete category
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      deleteCategoryMutation.mutate({ id: selectedRowId });
                      setOpen(false);
                    }}
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Confirm Delete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>
    </>
  );
}
