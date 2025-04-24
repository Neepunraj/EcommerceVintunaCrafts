import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const isauthUser = await AuthUSer(req);

    if (isauthUser) {
      const { searchParams } = new URL(req.url);

      const id = searchParams.get("id");

      if (id) {
        const getAllOrders = await Order.find({ user: id }).populate(
          "orderItems.product"
        );
        if (getAllOrders) {
          return NextResponse.json({
            success: true,
            data: getAllOrders,
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "unable to get all the orders",
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Uer id required",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error Occured",
    });
  }
}
