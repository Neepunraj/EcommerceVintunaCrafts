import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";

interface Story {
  title: string;
  description: string;
  content: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return NextResponse.json({
      success: false,
      message: "Request method must be POST.",
    });
  }

  try {
    const { theme }: { theme: string } = await req.json();

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `Write a story about ${theme}`,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error("Failed to generate story");
    }

    const reader = ollamaResponse.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader from response");
    }

    let storyContent = "";
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });

      try {
        const parsedChunk = JSON.parse(chunk);
        if (parsedChunk.response) {
          storyContent += parsedChunk.response;
        }
      } catch (e) {
        console.error("Failed to parse chunk", e);
      }
    }

    const story: Story = {
      title: `Story about ${theme}`,
      description: `A fascinating tale inspired by ${theme}`,
      content: storyContent,
    };

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile("stories.xlsx").catch(async (error) => {
      if (error.code === "ENOENT") {
        console.log("File not found, creating a new one.");
      } else {
        throw error; // Rethrow the error for any unexpected errors
      }
    });
    let sheet = workbook.getWorksheet("Stories");
    if (!sheet) {
      sheet = workbook.addWorksheet("stories");
    }

    if (sheet.rowCount === 0) {
      sheet.addRow(["Title", "Description", "Content"]);
    }

    sheet.addRow([story.title, story.description, story.content]);

    await workbook.xlsx.writeFile("stories.xlsx");

    return NextResponse.json({
      success: true,
      message: "Successfully generated story",
      story,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
}
