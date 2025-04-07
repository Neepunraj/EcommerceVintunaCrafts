import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export const DELETE = async (req: NextRequest) => {
  try {
    const authUser = await AuthUSer(req);
    await connectToDB();
    if (authUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Product ID Required ",
        });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product Deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Unable to delete",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Not authenticated  ",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error ",
    });
  }
};
