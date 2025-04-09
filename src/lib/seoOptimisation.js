import ExcelJS from "exceljs";
import path from "path";
import cheerio from "cheerio";
import { processOllamaResponse } from "../lib/ollamaResponseProcessor";

export const optimizeSeo = async (title, description, keywords) => {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.resolve(process.cwd(), "seoOptimise.xlsx");
  await workbook.xlsx.readFile(filePath);
  const outputSheet =
    workbook.getWorksheet("Output") || workbook.addWorksheet("Output");

  if (outputSheet.rowCount === 0) {
    outputSheet.addRow([
      "Title",
      "Description",
      "Keywords",
      "Title in H1 Format",
      "Description in H2 Format",
      "Meta Title",
      "Meta Description",
    ]);
  }

  try {
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `
    Act as an SEO specialist and optimize the following elements for search engine ranking. Please provide your answers in HTML format, utilizing <div> and <h2> tags, all written in a single paragraph to avoid extra whitespace. 

    Original Title: "${title}" 
    Original Description: "${description}" 
    Keywords: "${keywords}" 

    Please optimize the following: 
    - **Meta Title**: Create an engaging meta title that includes primary keywords and is up to 70 characters. 
    - **Meta Description**: Create a compelling meta description that is concise for click-through rates and limited to 160 characters. 
    - **Optimized Title**: Provide an optimized title based on the original. 
    - **Optimized Description**: Provide an optimized description based on the original. 

    Ensure the keywords are relevant and strategically placed. Your goal is to improve the chances of ranking in the top results on Google.
`,
      }),
    });

    if (!ollamaResponse.ok) {
      console.error(`Error communicating with Ollama API`);
      return;
    }

    const jsonResponse = await processOllamaResponse(ollamaResponse);
    const matchResponseonly = jsonResponse
      .map((item) => item.response)
      .join("");

    outputSheet.addRow([matchResponseonly]);

    await workbook.xlsx.writeFile(filePath);
  } catch (error) {
    console.error(`Error in optimizing: ${error.message}`);
  }
};
