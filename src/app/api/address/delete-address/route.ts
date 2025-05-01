import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Address from "@/models/address";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "User Id Required",
      });
    }
    const isAuthuser = await AuthUSer(req);
    if (isAuthuser) {
      const deleteAddress = await Address.findByIdAndDelete(id);
      if (deleteAddress) {
        return NextResponse.json({
          success: true,
          message: "Deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Unable to delete, please try again",
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
      message: "Some Error Occured",
    });
  }
}
