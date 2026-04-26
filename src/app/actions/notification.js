"use server";

import dbConnect from "@/lib/dbConnect";
import { Notification } from "@/lib/modals/notification";

export async function fetchNotification() {
    try {
        await dbConnect();
        const notifications = await Notification.find().sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(notifications || []));
    } catch (error) {
        console.error("fetchNotification error:", error);
        return [];
    }
}
export async function UpdateNotificationStatus(id) {
    try {
        await dbConnect();

        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { status: "read" },
            { new: true }
        );

        return JSON.parse(JSON.stringify(updatedNotification));
    } catch (error) {
        console.error("UpdateNotificationStatus error:", error);
        throw new Error("Failed to update notification status");
    }
}
export async function DeleteNotificationStatus(id) {
    try {
        await dbConnect();

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            throw new Error("Notification not found");
        }

        return JSON.parse(JSON.stringify(deletedNotification));
    } catch (error) {
        console.error("DeleteNotificationStatus error:", error);
        throw new Error("Failed to delete notification");
    }
}