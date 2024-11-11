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



  export function TableCompo(endData:any)
  

  
  
  

  {
    


    console.log("end",endData.dates)
    const reportRef = useRef<HTMLDivElement | null>(null);
    const data = endData.endData
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
              ${printContent}
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


    console.log("",endData.endData)
    return (
     
   <div>
   <div ref={reportRef}>


      <Table >

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
              <TableCell>1000</TableCell>
              <TableCell>{chart.manPower}</TableCell>
              <TableCell>{chart.hours}</TableCell>
              <TableCell className="text-right">{chart.efficiency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
         
        </TableFooter>
      </Table>
      

   </div>
   <Button className="mt-5" onClick={handlePrint}>
          Download as PDF
        </Button>

   </div>
   
    // <>
    // </>
    )
  }
  