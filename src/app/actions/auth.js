"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/modals/user";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { cookies } from "next/headers";
export async function CheckisAdmin(params) {
  console.log("🚀 ~ CheckisAdmin ~ params:", params)
  await dbConnect();

  try {
    const user = await User.findOne({
      email: params.email,
    });
    console.log("🚀 ~ CheckisAdmin ~ user:", user)
    if (!user) {
      return {
        Error: {
          message: "User not Exist",
        },
      };
    }
    const encodedPassword = encodeHexLowerCase(
      sha256(new TextEncoder().encode(params.password))
    );
    console.log("🚀 ~ CheckisAdmin ~ encodedPassword:", encodedPassword)
    if (encodedPassword == user.password) {
      const cookieStore = await cookies(); // ✅ Wait for the cookie store
      cookieStore.set("id", user._id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return {
        success: "authorized",
        user: JSON.parse(JSON.stringify(user)),
      };
    } else {
      return {
        Error: {
          message: "invalid password",
        },
      };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      Error: {
        message: "error user creating",
      },
    };
  }
}

export async function fetchStaff() {
  try {
    await dbConnect();
    const staff = await User.find().select("-password");
    return JSON.parse(JSON.stringify(staff));
  } catch (error) {
    return {
      Error: {
        message: "Error fetching staff",
      },
    };
  }
}
export async function addeStaff(params) {
  try {
    await dbConnect();

    const isEmailExist = await User.findOne({ email: params.email });
    if (isEmailExist) {
      throw new Error("Email already exists");
    }

    const password = encodeHexLowerCase(
      sha256(new TextEncoder().encode(params.password))
    );
    params.password = password;

    const newStaff = new User({
      email: params.email,
      password: params.password,
      role: params.role,
    });

    const savedStaff = await newStaff.save();

    return {
      success: "Staff added successfully",
      savedStaff: JSON.parse(JSON.stringify(savedStaff)),
    };
  } catch (error) {
    // Rethrow the actual error for useMutation's onError to catch
    throw new Error(error.message || "Error adding staff");
  }
}

export async function updateStaffRole(params) {
  try {
    await dbConnect();
    const staff = await User.findByIdAndUpdate(
      params.id,
      { $set: { role: params?.status } },
      { new: true, select: "-password" }
    );
    return {
      success: "Staff update successfully",
      staff: JSON.parse(JSON.stringify(staff)),
    };
  } catch (error) {
    return {
      Error: {
        message: "Error update Staff Role",
      },
    };
  }
}
export async function deleteStaff(params) {
  try {
    await dbConnect();
    const { id } = params;
    const isEmailExist = await User.findOne({ _id: "6834c28b5d6d061dbf9b17af" });
    if (isEmailExist) {
      throw new Error("Admin user cannot be deleted");
    }
    const staff = await User.findByIdAndDelete(id);
    if (!staff) {
      return {
        Error: {
          message: "Staff not found",
        },
      };
    }
    return {
      success: "Staff deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message || "Error deleting staff");
  }
}
