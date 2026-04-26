import mongoose, { Schema, model, models } from "mongoose";



const userSchema = new Schema(
  {
    email : {type : String , required : true , unique : true},
    password: { type: String, required: true },
    role : {
      type: String,
      enum: ["member", "admin"],
      default: "member",}
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model("User", userSchema);
