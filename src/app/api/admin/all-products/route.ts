import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const extractAllProducts = await Product.find({});
    if (extractAllProducts) {
      return NextResponse.json({
        success: true,
        data: extractAllProducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no Products Found",
        status: 204,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
};
