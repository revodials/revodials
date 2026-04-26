"use server";

import dbConnect from "@/lib/dbConnect";
import { Catagory } from "@/lib/modals/catagory";
import { Order } from "@/lib/modals/order";
import { Products } from "@/lib/modals/product";
import mongoose from "mongoose";
import { sendEmail } from "./send-email";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { statusEmail } from "./send-email";
import { Notification } from "@/lib/modals/notification";
dayjs.extend(utc);
dayjs.extend(timezone);

export async function fetchProducts(page = 1, limit = 10, category = "all", selectedStatus) {
  try {
    await dbConnect();
    const query = category !== "all" ? { category: category } : {};

    if (selectedStatus && selectedStatus !== "all") {
      query.status = selectedStatus;
    }

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Products.find(query)
        .populate("category", "name")
        .skip(skip)
        .limit(limit)
        .lean(),
      Products.countDocuments(query),
    ]);

    return {
      products: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}


export async function fetchProductsbyCategories(skip = 0, limit = 12) {
  try {
    await dbConnect();
      const products = await Products.find({ mainCategory: "All-products", status: "active" })
      .skip(skip)
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Detailed fetch error:", error);
    return [];
  }
}



export async function fetchProductsById(id) {
  try {
    await dbConnect();

    const product = await Products.findOne({ _id: id, status: "active" });

    if (!product) {
      throw new Error("Product not found or is inactive");
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function addProducts(req) {
  try {
    await dbConnect();
    let categoryId;

    const result = await HandleImageUpload(req.images);
    if (result) {
      req.images = result;
    } else {
      toast.error(result.message || "Image upload failed.");
    }

    if (mongoose.Types.ObjectId.isValid(req.category)) {
      const isCategory = await Catagory.findById(req.category).lean();;
      if (isCategory) {
        categoryId = isCategory._id;
      } else {
        throw new Error('Category ID not found');
      }
    } else {
      let existing = await Catagory.findOne({ name: req.category }).lean();;
      if (existing) {
        categoryId = existing._id;
      } else {
        const newCategory = await Catagory.create({ name: req.category });;
        categoryId = newCategory._id;
      }
    }

    req.category = categoryId;

    const data = await Products.create(req);

    return {
      msg: 'Product created successfully',
      data: JSON.parse(JSON.stringify(data)),
    }
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

export async function deleteProducts(id) {
  try {
    await dbConnect();
    if (!id) {
      return { msg: "Id not found" };
    }
    let data = await Products.findByIdAndDelete(id);
    return {
      data: JSON.parse(JSON.stringify(data)),
      msg: "Product deleted successfully"
    };
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

export async function hideProducts(id) {
  try {
    await dbConnect();

    if (!id) {
      return { msg: "Product ID is required", data: null };
    }

    const data = await Products.findByIdAndUpdate(
      id,
      { status: "hide" },
      { new: true }
    );

    if (!data) {
      return { msg: "Product not found", data: null };
    }

    return {
      data: JSON.parse(JSON.stringify(data)),
      msg: "Product hidden successfully"
    };
  } catch (error) {
    throw new Error(`Failed to hide product: ${error.message}`);
  }
}
export async function restoreProducts(id) {
  try {
    await dbConnect();

    if (!id) {
      return { msg: "Product ID is required", data: null };
    }

    const data = await Products.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );

    if (!data) {
      return { msg: "Product not found", data: null };
    }

    return {
      data: JSON.parse(JSON.stringify(data)),
      msg: "Product restored successfully"
    };
  } catch (error) {
    throw new Error(`Failed to restore product: ${error.message}`);
  }
}




export async function updateProducts(req) {
  try {
    await dbConnect();
    if (!req._id) {
      throw new Error("Id not found");
    }
    let data = await Products.findByIdAndUpdate(req._id, { ...req });

    return {
      data: JSON.parse(JSON.stringify(data)),
      msg: "Product update successfully"
    }
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export async function HandleImageUpload(params) {
  const cloudName = process.env.Cloud_name;
  const apiKey = process.env.Api_key;
  const apiSecret = process.env.Api_secret;
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = await generateSignature(timestamp, apiSecret);

  const uploadPromises = params.map(async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    if (apiKey && timestamp && signature) {
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.secure_url;
    } else {
      const data = await response.json();
      console.error("Cloudinary error:", data.error.message);
      throw new Error(data.error.message);
    }
  });

  const uploadImages = await Promise.all(uploadPromises);
  return uploadImages;
}

function generateSignature(timestamp, apiSecret) {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
}

// orders checkout actions
export const orderCheckout = async (req) => {
  try {
    await dbConnect();
    const order = new Order({ ...req });
    await order.save();
    if (!order) {
      throw new Error("Failed to create order");
    }
    const OrderData = await Order.findById(order._id).populate("items.productId");
    try {
      const notify = new Notification({
        name: OrderData?.user?.firstName,
        city: OrderData?.user?.city,
      });
      await notify.save();
    } catch (err) {
      console.error("Notification save failed:", err);
    }
    if (order?.user?.email) {
      await sendEmail({
        email: order.user.email,
        orderId: order.orderId,
        customerEmail: true,
      });
    }
    await sendEmail({
      email: "info.Revodials@gmail.com",
      orderId: order.orderId,
      OrderData: OrderData,
    });
    return {
      msg: "Order created successfully",
    }
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`)
  }
};




export const fetchOrders = async (city, UserDate, paramsStatus, page = 1, limit = 10) => {
  try {
    await dbConnect();
    const query = { status: { $ne: "delete" } };

    if (city) {
      query["user.city"] = city;
    }

    if (paramsStatus) {
      query.status = paramsStatus;
    }

    if (UserDate?.from && UserDate?.to) {
      const start = dayjs.tz(UserDate?.from, "Asia/Karachi").startOf("day").toDate();
      const end = dayjs.tz(UserDate?.to, "Asia/Karachi").endOf("day").toDate();

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }
    const skip = (page - 1) * limit;
    const [orders, totalCount] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .populate("items.productId")
        .skip(skip)
        .limit(limit)
        .lean(),

      Order.countDocuments(query),
    ]);

     const totalPages = Math.ceil(totalCount / limit);

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

export async function updateOrderStatus({ status, id, orderId, email }) {
  try {
    await dbConnect();

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    if (status == "processing" || status == "shipped" || status == "cancelled") {
      await statusEmail({ email, orderId, status });
    }
    return {
      msg: "Order status updated successfully",
    }

  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
}

export async function fetchCatagory() {
  await dbConnect();
  const catagory = await Catagory.find();
  const plainData = JSON.parse(JSON.stringify(catagory));
  return plainData;
}

// orderTrackng
export async function orderTrackng(id) {
  await dbConnect();
  const tracking = await Order.findOne({ orderId: id }).populate(
    "items.productId"
  );
  return JSON.parse(JSON.stringify(tracking));
}

// Fetch products by category ID
export async function fetchProductsbyCategoriesId(id, page = 1) {
  try {
    const limit = 6;
    const skip = (page - 1) * limit;

    let query = { status: "active" };
    if (id) {
      query.category = id;
    }

    await dbConnect();

    const products = await Products.find(query)
      .skip(skip)
      .limit(limit);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error("Failed to fetch products by category");
  }
}
