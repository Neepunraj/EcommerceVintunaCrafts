import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);

    const productID = searchParams.get("id");
    if (!productID) {
      return NextResponse.json({
        success: false,
        message: "Product id is required",
        status: 400,
      });
    }

    const getData = await Product.find({ _id: productID });
    if (getData) {
      return NextResponse.json({
        success: true,
        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No product Found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "unable",
    });
  }
}
