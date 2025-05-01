import { ShippingAddressType } from "@/interfaces";
import AuthUSer from "@/middleware/AuthUSer";
import { NextRequest, NextResponse } from "next/server";

import Address from "@/models/address";
import connectToDB from "@/database";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUSer(req);
    if (isAuthUser) {
      const data: ShippingAddressType = await req.json();
      const { _id, fullName, city, address, country, postalCode } = data;

      const updataAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          fullName,
          city,
          address,
          country,
          postalCode,
        },
        { new: true }
      );
      if (updataAddress) {
        return NextResponse.json({
          success: true,
          message: "successfully updated",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Unable to update",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        messgae: "You are not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error Occured",
    });
  }
}
