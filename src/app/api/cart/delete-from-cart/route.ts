import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import { NextRequest, NextResponse } from "next/server";

import Cart from "@/models/cart";
export const dynamic = "force-dynamic";
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const auhtUser = await AuthUSer(req);
    if (auhtUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Cart Item Id is required",
        });
      }
      const deleteFromCart = await Cart.findByIdAndDelete(id);
      if (deleteFromCart) {
        return NextResponse.json({
          success: true,
          message: "Cart Items Deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "unable to delete from cart",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured catch",
    });
  }
}
