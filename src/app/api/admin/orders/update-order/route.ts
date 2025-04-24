import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUSer(req);
    if (isAuthUser) {
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
