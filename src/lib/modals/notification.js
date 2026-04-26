import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    name: { type: String },
    city: { type: String },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
  },
  { timestamps: true }
);

// Export the model correctly
export const Notification =
  mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
