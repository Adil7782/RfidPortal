import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { getData } from "../action";
import { Button } from "@/components/ui/button";

const ExportExcel = ({ dataa }: any) => {

    const [isDataReady, setIsDataReady] = useState(false);
    
  useEffect(() => {
    // Enable the button if data is available
    if (dataa && dataa.length > 0) {
      setIsDataReady(true);
    } else {
      setIsDataReady(false);
    }
  }, [dataa]);



  const handleDownloadExcel = async () => {
    
      const data :any = dataa
      


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
      "07": "B",
      "08": "C",
      "09": "D",
      "10": "E",
      "11": "F",
      "12": "G",
      "13": "H",
      "14": "I",
      "15": "J",
      "16": "K",
      "17": "L",
    };

    data.forEach((item: any) => {
      const hour = item.hour; // Get the hour from the data
      const column = hourToColumnMap[hour]; // Find the corresponding column for the hour
      console.log("aaa",column)

      const difference = item.grand_total - item.target;
const formattedValue = difference > 0 ? `+${difference}` : difference.toString();

      if (column) {
        // If a matching column is found, write the total_passed_products into the corresponding cell
        worksheet[`${column}${startingRow}`] = { v: item.total_passed_products }; // Write total_passed_products

        // Write target and grand_total if needed (modify row index if necessary)
        if (startingRow === 8) { // Assuming you want to write target only once
          worksheet[`A${startingRow}`] = { v: item.target }; // Write target to column A
        }
        worksheet[`M${startingRow}`] = { v: item.grand_total }; 
        
        worksheet[`N${startingRow}`] = { v: formattedValue }; 
        worksheet[`O${startingRow}`] = { v: ((item.grand_total/item.target) *100).toFixed(2)};
        const totalSMV = item["0"].totalSMV; 
        worksheet[`P${startingRow}`] = { v: totalSMV };
        const utm = item["0"].utilizedMachines; 
        worksheet[`R${startingRow}`] = { v: utm };
        const utsm = item["0"].utilizedSewingOperators; 
        worksheet[`S${startingRow}`] = { v: utsm };
        const uthp = item["0"].utilizedHelpers; 
        worksheet[`T${startingRow}`] = { v: uthp };
        const utim = item["0"].utilizedIronOperators; 
        worksheet[`U${startingRow}`] = { v: utim };
        const osmo = item["0"].obbSewingOperators; 
        worksheet[`V${startingRow}`] = { v: osmo };
        const oh = item["0"].obbHelpers; 
        worksheet[`W${startingRow}`] = { v: oh };
        const oimo = item["0"].obbIronOperators; 
        worksheet[`X${startingRow}`] = { v: oimo };
        const tw = item["0"].targetWorkingHours; 
        worksheet[`Y${startingRow}`] = { v: tw };
        const wh = item["0"].workingHours; 
        worksheet[`AA${startingRow}`] = { v: wh };
        const de = item["0"].dailyPlanEfficiency; 
        worksheet[`AE${startingRow}`] = { v: de };
      }
    });

    // Step 5: Generate the updated Excel file for download
    const updatedFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // // Step 6: Create a blob for the file and trigger the download
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
      <Button className="shadow-md" onClick={handleDownloadExcel} disabled={!isDataReady}>Download Excel Template</Button>
    </div>
  );
};

export default ExportExcel;
