import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const getData = await Product.find({ category: id });
    if (getData) {
      return NextResponse.json({
        success: true,

        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no product with the id found",
        status: 204,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
