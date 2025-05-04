import AuthUSer from "@/middleware/AuthUSer";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PqEEhRogN8CI6sDKzNA9hkvUakQqeBKuTYDPBkRnr356z4SIb1Lp2ZkOZSN6Swqp4slOXkGTfVZ5dxXk6BJl6ra00bJ7zKiVh",
  {
    apiVersion: "2025-04-30.basil",
  }
);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAuthUser = await AuthUSer(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe?.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });
      console.log(res);
      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
