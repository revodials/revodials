import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HandleImageUpload, updateProducts } from "../actions/products";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Tiptap from "./text-editor";
import { Trash } from "lucide-react";

function Editdialog({ open, onOpenChange, seletedata, catagory }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      description: seletedata?.description || "<p></p>",
    },
  });

  const [existingImages, setExistingImages] = React.useState([]);
  const [newImages, setNewImages] = React.useState([]);
  const [filesToUpload, setFilesToUpload] = React.useState([]);
  const [variants, setVariants] = React.useState([]);
  const [text, setText] = React.useState('');
  useEffect(() => {
    if (seletedata && open) {
      reset({
        name: seletedata.name || "",
        price: seletedata.price || "",
        Sellprice: seletedata.Sellprice || "",
        description: seletedata.description || "",
        stock: seletedata.stock || "",
        category: seletedata.category?._id || "",
      });
      setExistingImages(seletedata.images || []);
      setVariants(seletedata.variants || []);
      setNewImages([]);
      setFilesToUpload([]);
    }
  }, [seletedata, open, reset]);

  const getChangedFields = (original, updated) => {
    const changes = {};
    changes._id = original._id;

    for (const key in updated) {
      if (key === "category") {
        const originalCategoryId = original.category?._id || original.category;
        if (updated.category !== originalCategoryId) {
          changes.category = updated.category;
        }
      } else if (key !== "image") {
        if (updated[key] !== original[key]) {
          changes[key] = updated[key];
        }
      }
    }

    return changes;
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        variants: variants,
      };
      const changed = getChangedFields(seletedata, updatedData);

      let finalImages = [...existingImages];

      if (filesToUpload.length > 0) {
        const uploadResults = await HandleImageUpload(filesToUpload);
        finalImages = [...finalImages, ...uploadResults];
      }

      const originalImages = seletedata.images || [];
      if (JSON.stringify(originalImages) !== JSON.stringify(finalImages)) {
        changed.images = finalImages;
      }

      mutation.mutate(changed);
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFilesToUpload(files);

      // Create preview URLs for new images
      const newImagePreviews = files.map(file => URL.createObjectURL(file));
      setNewImages([...newImagePreviews]);
    }
  };

  const removeImage = (index, isNewImage) => {
    if (isNewImage) {
      // Remove from new images and files to upload
      const updatedNewImages = [...newImages];
      const updatedFiles = [...filesToUpload];
      updatedNewImages.splice(index, 1);
      updatedFiles.splice(index, 1);
      setNewImages(updatedNewImages);
      setFilesToUpload(updatedFiles);

      // Revoke the object URL
      URL.revokeObjectURL(newImages[index]);
    } else {
      // Remove from existing images
      const updatedImages = [...existingImages];
      console.log("TCL: removeImage -> updatedImages", updatedImages)
      updatedImages.splice(index, 1);
      console.log("TCL: removeImage -> after slice updatedImages", updatedImages)
      setExistingImages(updatedImages);
    }
  };

  const mutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      toast.success("Product updated successfully!");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Clean up object URLs
      newImages.forEach(image => URL.revokeObjectURL(image));
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error(error.message || "Failed to update product");
    },
  });
  const handleAdd = () => {
    if (!text) return toast.error(`Please enter Variants`);
    setVariants([...variants, text]);
    setText("");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-lg bg-white p-0 overflow-hidden shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-gray-100 px-3 py-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Edit Product
              </DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] px-3 py-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input
                  {...register("name")}
                  placeholder="Enter product name"
                  className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Price and Sell Price */}
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
                      {...register("price")}
                      type="number"
                      placeholder="0.00"
                      className="pl-8 bg-white border-gray-200"
                    />
                  </div>
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
                      {...register("Sellprice")}
                      type="number"
                      placeholder="0.00"
                      className="pl-8 bg-white border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Tiptap value={field.value} onChange={field.onChange} />
                  )}
                />

              </div>

              {/* Category and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                    defaultValue={seletedata?.category?._id || ""}
                  >
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Stock
                  </label>
                  <Input
                    {...register("stock")}
                    type="number"
                    placeholder="Enter quantity"
                    className="bg-white border-gray-200"
                  />
                </div>
              </div>
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
                  {variants?.map((item, index) => (
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
                          const updated = variants?.filter(
                            (_, i) => i !== index
                          );
                          setVariants(updated);
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
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>

                {/* Upload Area */}
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
                      <span className="font-medium text-blue-600">
                        Click to upload
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    multiple
                  />
                </label>

                {/* Image Previews */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {/* Existing Images */}
                  {existingImages.map((img, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img}
                        alt={`Preview ${index + 1}`}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, false)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                        aria-label="Remove image"
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

                  {/* New Images */}
                  {newImages.map((img, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200"
                    >

                      <Image
                        src={img}
                        alt={`New preview ${index + 1}`}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, true)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                        aria-label="Remove image"
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
            </form>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Editdialog;