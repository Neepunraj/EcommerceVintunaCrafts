import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi, { object } from "joi";
import { NextResponse } from "next/server";

const Schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});
export const dynamic = "force-dynamic";
export async function POST(req: NextResponse) {
  await connectToDB();
  const { email, password, name, role } = await req.json();
  const { error } = Schema.validate({
    email,
    password,
    name,
    role,
  });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isUserRegisteredAlready = await User.findOne({ email });
    if (isUserRegisteredAlready) {
      return NextResponse.json({
        success: false,
        message: "User Already exist Please try again with other email",
      });
    } else {
      const hasPassword = await hash(password, 12);
      const newlyCreatedUser = {
        name,
        email,
        password: hasPassword,
        role,
      };
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created Successfully",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something Went Wrong Please try again later",
    });
  }
}
