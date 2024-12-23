import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRef } from "react";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

  export function TableCompo(endData:any)
  

  
  
  

  {

    


    console.log("end",endData.dates)
    const reportRef = useRef<HTMLDivElement | null>(null);
    const data = endData.endData
    const date = endData.dates

    const handlePrint = () => {
        const baseUrl = window.location.origin;
        const printContent = reportRef.current?.innerHTML;
        let selectedDate = new Date(endData.dates);
      
        // Subtract one day from the selected date
        selectedDate.setDate(selectedDate.getDate());
      
        // Format the adjusted date back to a string
        const formattedDate = selectedDate.toISOString().split('T')[0];
        
      
        const htmlContent = `
          <html>
            <head>
              <title>Line Efficiency Report</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  width: 100%;
                  margin: 0 auto;
                  padding: 20px;
                  box-sizing: border-box;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                }
                th {
                  text-align: center;
                  background-color: gray;
                }
                td {
                  text-align: left;
                }
                .logo-div {
                  text-align: center;
                }
                .logo-div img {
                  width: 170px;
                  height: auto;
                }
                .text-center {
                  text-align: center;
                }
                .footer-logo img {
                  width: 120px;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <div class="logo-div">
                <img src="${baseUrl}/images/logoo.png" alt="Ha-Meem Logo" style="margin-top:10px;"/>
               
              </div>
              <h1 class="text-center">Line Efficiency Report</h1>
              <hr />
              <div>
                <h5>Factory Name: Apparel Gallery LTD</h5>
                <h5>Title: Line Efficiency Report</h5>
                <h5>Date: ${formattedDate}</h5>
                <h5>Unit: ${endData.endData[0].unitName}</h5>
    
                <h5>Line Name: ${endData.endData[0].lineName}</h5>
              </div>
              <div className="text-right">
              ${printContent}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 50px;">
                <div>
                  <p><a href="https://rfid-tracker.eliot.global/">https://rfid-tracker.eliot.global/</a></p>
                </div>
                <div class="footer-logo">
                  <img src="${baseUrl}/images/image.png" alt="Company Footer Logo" />
                </div>
              </div>
            </body>
          </html>
        `;
      
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const printWindow = window.open(url, '', 'width=800,height=600');
        
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
            URL.revokeObjectURL(url);
          };
        } else {
          console.error("Failed to open print window");
        }
      };

      const handleDownloadPDF = async () => {
        if (!reportRef.current || !data.length) return;
    
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            logging: false,
            useCORS: true
          } as any);
    
          const imgWidth = 210 -20; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imgWidth, imgHeight);
          
          const fileName = `Operator_Monthly_Efficiency_Report_${data[0].unitName}_${date}.pdf`;
          pdf.save(fileName);
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      };

    // console.log("",endData.endData)
    return (
     
   <div>
    <Button className="mb-5" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
   <div ref={reportRef}>
   <div className="text-center">
          <img src="/images/logoo.png" alt="Ha-Meem Logo" className="mx-auto w-[120px] h-auto mt-[10px]" />
          {/* <h5 className="mt-[10px]">~ Bangladesh ~</h5> */}
          <h1 className="text-center font-semibold">Line Efficiency Report</h1>
          <hr className="my-4" />
        </div>
        
        <div className="flex justify-end mt-5 text-sm mb-4">
          <div className="flex-1 mr-[10px] leading-[1.5]">
            <h5 className=" font-semibold">Factory Name: Apparel Gallery LTD</h5>
                <h5 className=" font-semibold">  Lines: {data.map((d: any) => d.lineName).join(" - ")}</h5>

            {/* <h5 className="m-0">Operator: {data[0]?.name}</h5>
            <h5 className="m-0">Employee Id: {data[0]?.employeeId}</h5>
            <h5 className="m-0">Report Starting Date: {startdate}</h5>
            <h5 className="m-0">Report Ending Date: {enddate}</h5> */}
          </div>
          <div className="flex-1  ml-[10px] leading-[1.5]">
            {/* <h5 className="m-0">Unit: {obb?.[0]?.unit}</h5>
            <h5 className="m-0">Buyer: {obb?.[0]?.buyer}</h5>
            <h5 className="m-0">Style Name: {obb?.[0]?.style}</h5> */}
            {/* <h5 className="m-0">Line Name: {obb?.[0]?.line}</h5> */}
            <h5 className=" font-semibold">Generated Date: {date}</h5>
            <h5 className=" font-semibold">Unit: {endData.endData[0].unitName}</h5>

          </div>
        </div>




      <Table className="min-w-full border-collapse border border-gray-300" >

        <TableHeader>
          <TableRow>
            <TableHead >Unit</TableHead>
            <TableHead>Line</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Total SMV</TableHead>
            <TableHead>Production Qty</TableHead>
            <TableHead>Man Power</TableHead>
            <TableHead>Hours Worked</TableHead>
            <TableHead className="text-right">Line Efficiency</TableHead>
          
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((chart:any) => (
            <TableRow key={chart.name}>
              <TableCell className="font-medium">{chart.unitName}</TableCell>
              <TableCell>{chart.lineName}</TableCell>
              <TableCell>{chart.obbstyle}</TableCell>
              <TableCell>{chart.smv}</TableCell>
              <TableCell>{chart.count}</TableCell>
              <TableCell>{chart.manPower}</TableCell>
              <TableCell>{chart.hours}</TableCell>
              <TableCell className="text-right">{chart.efficiency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
         
        </TableFooter>
      </Table>
      <div className="flex justify-between items-center mt-12">
  <div>
    <p>
      <a href="https://rfid-tracker.eliot.global/" className="text-blue-500 hover:underline">
        https://rfid-tracker.eliot.global/
      </a>
    </p>
  </div>
  <div className="footer-logo">
    <img src="/images/image.png" alt="Company Footer Logo" className="w-auto h-auto" />
  </div>
</div>

      

   </div>
   

   </div>
   
    // <>
    // </>
    )
  }
  