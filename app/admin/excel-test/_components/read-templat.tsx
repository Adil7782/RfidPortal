import React from "react";
import * as XLSX from "xlsx";

const ExportExcel = ({ data }: any) => {
  const handleDownloadExcel = async () => {
    console.log(data);

    // Step 1: Fetch the Excel file template from the public folder
    const fileUrl = "/template.xlsx"; // Adjust path if necessary
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();

    // Step 2: Read the workbook from the ArrayBuffer
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Step 3: Select the first sheet from the workbook
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Step 4: Define the data array and mapping
    const startingRow = 8; // Starting row index for data insertion
    const hourToColumnMap: { [key: string]: string } = {
      "08": "B",
      "09": "C",
      "10": "D",
      "11": "E",
      "12": "F",
      "13": "G",
      "14": "H",
      "15": "I",
      "16": "J",
      "17": "K",
      "18": "L",
    };

    data.forEach((item: any) => {
      const hour = item.hour; // Get the hour from the data
      const column = hourToColumnMap[hour]; // Find the corresponding column for the hour

      if (column) {
        // If a matching column is found, write the total_passed_products into the corresponding cell
        worksheet[`${column}${startingRow}`] = { v: item.total_passed_products }; // Write total_passed_products

        // Write target and grand_total if needed (modify row index if necessary)
        if (startingRow === 8) { // Assuming you want to write target only once
          worksheet[`A${startingRow}`] = { v: item.target }; // Write target to column A
        }
        worksheet[`L${startingRow}`] = { v: item.grand_total }; // Write grand_total to column L
      }
    });

    // Step 5: Generate the updated Excel file for download
    const updatedFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Step 6: Create a blob for the file and trigger the download
    const blob = new Blob([updatedFile], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated_template_with_sample_data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownloadExcel}>Download Excel Template</button>
    </div>
  );
};

export default ExportExcel;
