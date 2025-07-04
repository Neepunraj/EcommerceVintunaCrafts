import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Account not found with this email address",
      });
    }
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Incorrect password please try again later",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "default_sec_key",
      { expiresIn: "1d" }
    );

    const finalData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };
    return NextResponse.json({
      success: true,
      message: "Login successful",
      finalData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error Occured in Login in",
    });
  }
}
