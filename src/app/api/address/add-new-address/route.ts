import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Address from "@/models/address";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const AddNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUSer(req);
    if (isAuthUser) {
      const data = await req.json();
      const { fullName, address, city, country, postalCode, userID } = data;
      const { error } = AddNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].context,
        });
      }
      const newlyAddedAddress = await Address.create(data);
      if (newlyAddedAddress) {
        return NextResponse.json({
          success: true,
          data: "Address Added Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          messgae: "unable to add new Address",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Not Authenticated user",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error Occuresd",
    });
  }
}
