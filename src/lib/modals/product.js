import mongoose from "mongoose";
const { Schema } = mongoose;
import { Catagory } from "./catagory.js";

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    mainCategory: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    stock: { type: Number, required: true }, 
    Sellprice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Catagory", required: true },
    status: { type: String, enum: ["active", "hide"], default: "active" },
    variants: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Products = mongoose.models.Product || mongoose.model("Product", productsSchema);
