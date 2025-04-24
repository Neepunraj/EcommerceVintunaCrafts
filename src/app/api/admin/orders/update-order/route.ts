import connectToDB from "@/database";
import { OrderDataType } from "@/interfaces";
import AuthUSer from "@/middleware/AuthUSer";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUSer(req);
    if (isAuthUser) {
      const data: OrderDataType = await req.json();
      if (isAuthUser.role === "admin") {
        const {
          _id,
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        } = data;

        const updateOrder = await Order.findOneAndUpdate(
          { _id: _id },
          {
            shippingAddress,
            orderItems,
            paymentMethod,
            isPaid,
            paidAt,
            isProcessing,
          },
          {
            new: true,
          }
        );
        if (updateOrder) {
          return NextResponse.json({
            success: true,
            message: "Order Status updated successfully",
          });
        } else {
          return NextResponse.json({
            sucees: false,
            message: "Failed to update the status of the order",
          });
        }
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Is not Authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error",
    });
  }
}
