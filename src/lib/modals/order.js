import mongoose from "mongoose";
import { Products } from "./product";
const { Schema } = mongoose;

// Define the item schema
const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  selectedVariant: { type: String },
});

// Define the order schema
const OrderSchema = new Schema(
  {
    items: [itemSchema],
    totalAmount: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true },
    user: {
      contact: String,
      Name: String,
      address: String,
      city: String,
      email: { type: String },
    },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled', 'shipped', "deleted"], default: 'pending' },
  },
  { timestamps: true }
);


export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
