import dbConnect from "@/lib/dbConnect";
import { Products } from "@/lib/modals/product";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    console.log("🚀 ~ GET ~ page:", page)
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const products = await Products.find()
      .skip(skip)
      .limit(limit)
      .lean();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}