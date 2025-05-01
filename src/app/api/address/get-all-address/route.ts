import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Address from "@/models/address";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is required",
      });
    }

    const isAuthuser = await AuthUSer(req);
    if (isAuthuser) {
      const extractAllAddress = await Address.find({ userID: id });
      if (extractAllAddress) {
        return NextResponse.json({
          success: true,
          data: extractAllAddress,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Cannot Extract All Address",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "User not Authticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in Geting Address",
    });
  }
}
