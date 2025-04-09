import { NextResponse } from "next/server";
import { optimizeSeo } from "../../../lib/seoOptimisation"; // Import the optimization logic

export async function POST(request) {
  const { title, description, keywords } = await request.json(); // Expecting JSON from the request

  try {
    const data = await optimizeSeo(title, description, keywords); // Call the optimization function
    return NextResponse.json({
      success: true,
      message: "SEO data optimized successfully.",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Error during optimization.",
    });
  }
}
