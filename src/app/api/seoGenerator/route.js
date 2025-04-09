import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";
import { addSeoJob } from "../../../lib/queue"; // Import the job queue function

export async function POST(request) {
  const { title, description, keywords } = await request.json();

  const workbook = new ExcelJS.Workbook();

  // Path to your Excel file
  const filePath = path.resolve(process.cwd(), "seoOptimise.xlsx"); // Update this path to your actual file

  // Load or create the Excel file
  try {
    await workbook.xlsx.readFile(filePath);
  } catch (error) {
    console.log("File not found. Creating a new Excel file.");
  }

  // Get the seoList worksheet
  const seoListSheet =
    workbook.getWorksheet("seoList") || workbook.addWorksheet("seoList");

  // Add headers if this is a new sheet
  if (seoListSheet.rowCount === 0) {
    seoListSheet.addRow(["Title", "Description", "Keywords"]); // Add headers
  }

  // Append the new entry to the seoList
  seoListSheet.addRow([title, description, keywords]);

  // Save the updated workbook
  await workbook.xlsx.writeFile(filePath);

  // Add a job to the queue for SEO optimization
  await addSeoJob(title, description, keywords);

  return NextResponse.json({
    success: true,
    message: "SEO entry added successfully.",
  });
}
