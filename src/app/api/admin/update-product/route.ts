import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
type Authuser = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();

    const isAuthUser: Authuser | null = await AuthUSer(req);

    if (isAuthUser && isAuthUser?.role === "admin") {
      const extractProducData = await req.json();

      const {
        _id,
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        imageUrl,
        priceDrop,
      } = extractProducData;

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          price,
          description,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        {
          new: true,
        }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product Updated Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to Update! Please Try again later",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Something went wrong ${error.message}`,
    });
  }
};
