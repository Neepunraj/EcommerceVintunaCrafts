import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const AddtoCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const authuser = await AuthUSer(req);

    if (authuser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddtoCart.validate({ userID, productID });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productID,
        userID: userID,
      });
      if (isCurrentCartItemAlreadyExists.length > 0) {
        return NextResponse.json({
          success: false,
          message: "Product Already exists please add another product",
        });
      }
      const saveProductToCart = await Cart.create(data);
      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Added to the cart successfully ",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "unable tp add to cart Please try again ",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated ",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error Occured ",
    });
  }
}
