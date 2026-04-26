"use server";
import { cookies } from "next/headers";
import dbConnect from "./dbConnect";
import { User } from "./modals/user";

export async function checkIslogin() {
  const cookieStore = await cookies();
  const tokenId = cookieStore.get("id")?.value;
  if (!tokenId) return null;
  await dbConnect();
  const isUser = await User.findById(tokenId).select("-password");
  if (!isUser) return false;

  return JSON.parse(JSON.stringify(isUser));
}

export async function logout() {
  (await cookies()).delete("id");
}