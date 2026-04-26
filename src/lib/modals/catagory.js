import mongoose from "mongoose";
const { Schema } = mongoose;

const catagorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Catagory =
  mongoose.models.Catagory || mongoose.model("Catagory", catagorySchema);
