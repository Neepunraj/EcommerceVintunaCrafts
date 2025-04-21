import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const authUser = await AuthUSer(req);
    if (authUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please login",
        });
      }
      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        "productID"
      );
      if (extractAllCartItems) {
        return NextResponse.json({
          success: true,
          data: extractAllCartItems,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No cart Items are found",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Not Authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured catch",
    });
  }
}
