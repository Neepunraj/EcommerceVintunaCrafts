import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
/*  */
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: "sk-ce32463b6d7f469090dcfbff99821235",
  });

  const deepSeekChatResponse = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });
  return NextResponse.json({
    success: true,
    data: deepSeekChatResponse.choices[0].message.content,
  });
}
