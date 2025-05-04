import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const authUser = await AuthUSer(req);
    if (authUser) {
      const getAllOrders = await Order.find({})
        .populate("orderItems.product")
        .populate("user");

      if (getAllOrders) {
        return NextResponse.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the orders ! please try again after some time",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error getting the order details",
    });
  }
}
