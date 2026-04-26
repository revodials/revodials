"use server";

import dbConnect from "@/lib/dbConnect";
import { Order } from "@/lib/modals/order";

export async function AdminPanelDataFetch(month = "06" , year = "2025") {

  try {
    await dbConnect();
    const monthNumber = parseInt(month);
    const yearNumber = parseInt(year);

    const query = {};
     if (!isNaN(monthNumber) && !isNaN(yearNumber)) {
      const startOfMonth = new Date(yearNumber, monthNumber - 1, 1);
      const endOfMonth = new Date(yearNumber, monthNumber, 0, 23, 59, 59, 999);

      query.createdAt = {
        $gte: startOfMonth,
        $lte: endOfMonth,
      };
    }
    const orders = await Order.find(query, "totalAmount user status").lean();
    const totalOrders = orders.length;
    const totalSales = orders.reduce(
      (acc, order) => acc + order.totalAmount || 0,
      0
    );
    const users = orders.map((order) => order.user);
    const pendingOrders = orders.filter((order) => order.status === "pending");

    const totalPendingOrders = pendingOrders.length;

    return {
      totalOrders,
      totalSales,
      users,
      totalPendingOrders,
    };
  } catch (error) {
    console.error("AdminPanelDataFetch error:", error);
    throw new Error("Failed to fetch admin analytics");
  }
}
