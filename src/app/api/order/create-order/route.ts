import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const authuser = await AuthUSer(req);
    if (authuser) {
      const data = await req.json();
      const { user } = data;

      const newOrder = await Order.create(data);
      if (newOrder) {
        await Cart.deleteMany({ userID: user });
        return NextResponse.json({
          success: true,
          message: "Products are on the way!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to create an order please try again ",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
