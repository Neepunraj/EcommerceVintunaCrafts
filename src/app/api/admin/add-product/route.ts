import connectToDB from "@/database";
import AuthUSer from "@/middleware/AuthUSer";
import Product from "@/models/product";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const addnewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});
export const POST = async (req: NextRequest) => {
  try {
    const authuser = await AuthUSer(req);

    if (authuser && authuser.role === "admin") {
      await connectToDB();

      const data = await req.json();
      const {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = data;

      const { error } = addnewProductSchema.validate({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlycreatedProduct = await Product.create(data);

      if (newlycreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product Added Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Unable to Add Product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
};
