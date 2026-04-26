"use server"

import dbConnect from "@/lib/dbConnect";
import { Catagory } from "@/lib/modals/catagory";

export async function editCategory({ id, value }) {
   try {
     await dbConnect();
     if (!id) {
       return { msg: "Id not found" };
     }
     let data = await Catagory.findByIdAndUpdate(id, { name: value }, { new: true });
     return {
       data: JSON.parse(JSON.stringify(data)),
       msg: "category updated successfully"
     };
   } catch (error) {
     throw new Error(`Failed to update category: ${error.message}`);
   }
}

export async function deleteCategory(id) {
  try {
    await dbConnect();
    if (!id) {
      return { msg: "Id not found" };
    }
    let data = await Catagory.findByIdAndDelete(id.id);
    return {
      data: JSON.parse(JSON.stringify(data)),
      msg: "category deleted successfully"
    };
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}
export async function addCategory({ value }) {
  await dbConnect();
  if (!value) {
    return { msg: "Name not found" };
  }
  const data = await Catagory.create({ name: value });
  return {
    data: JSON.parse(JSON.stringify(data)),
    msg: "category created successfully"
  };
}

