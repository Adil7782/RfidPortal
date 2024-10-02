"use client";

import { toast } from "@/components/ui/use-toast";
import SelectUnitLineDate from "./select-unit-date-line";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getData } from "./actions";


 type ReportData={
  productionCount:number;
  hour:number;
  target:number;
  obboperationid:string;
  LineId:string;
  linename:string;
  unit:string;

 }

const LineEfficiencyReport = () => {

  const[date,setDate]=useState<string>("")
  const[data,setData]=useState<ReportData[]>([])
  const [obbSheetId, setObbSheetId] = useState<string>("");
  const [line,setline]=useState<string>("")
  const[unit,setunit]=useState<string>("")
  const [minh, setMinh] = useState<number>(0);
  const [maxh, setMaxh] = useState<number>(0);
  const handleUnitObbDate = async (data: { obbSheetId: string; date: Date; unit: string; line: string }) => {
    try {
      data.date.setDate(data.date.getDate() + 1);
      const formattedDate = data.date.toISOString().split("T")[0];
      setObbSheetId(data.obbSheetId)
      setDate(formattedDate)
      setline(data.line)
      setunit(data.unit)
      console.log("data0000",data);
    } catch (error: any) {
      console.error("Error fetching production data:", error);
      toast({
        title: "Something went wrong! Try again",
        variant: "error",
      });
    }
  };


  const fetchData=async()=>{
    const response=await getData(obbSheetId,date,line,unit)
    console.log("data",response)
    const maxh=Math.max(...response.map(o => o.hour))
    const minh=Math.min(...response.map(o => o.hour))
    setMaxh(maxh);
    setMinh(minh);
    console.log("max hour",maxh)
    console.log("max hour",minh)
  }

  useEffect(()=>{
    fetchData()
    
  },[obbSheetId,date])

  return (
    <>
    <div>
    <SelectUnitLineDate handleSubmit={handleUnitObbDate} />
    </div>
      
     <div className="mt-5">
      <Table>
        <TableHeader>
          <TableRow>
         
            <TableHead className="border" rowSpan={2}>
              Day Target
            </TableHead>
            <TableHead className="border" colSpan={10}>
              Target Vs Achievement
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              Day Production (BQC Pass)
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              Behind as per Target
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              Day Achieve%
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              SMV
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              Produce Min
            </TableHead>
            <TableHead className="border" rowSpan={2}>
              Utilized M/C
            </TableHead>
            <TableHead className="border" colSpan={3}>
              Utilized Man Power
            </TableHead>
            <TableHead className="border" colSpan={3}>
              OBB Man Power
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Target Working
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Working
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Loss Working
            </TableHead>
            <TableHead className="border" colSpan={4}>
              Daily Efficiency
            </TableHead>
            <TableHead className="border" colSpan={4}>
              Costing
            </TableHead>
          </TableRow>
          <TableRow>
            {/* Sub-Headers for Target Vs Achievement */}
            {/* {["8 to 9", "9 to 10", "10 to 11", "11 to 12", "12 to 13", "13 to 14", "14 to 15", "15 to 16", "16 to 17", "17 to 18"].map(
              (hour, index) => (
                <TableHead key={index} className="border">
                  {hour}
                </TableHead>
              )
            )} */}

              {(() => {
                const headers = [];
                for (let hour = minh; hour <= maxh; hour++) {
                  headers.push(<TableHead key={hour}>Hour-{hour-6}</TableHead>);
                }
                return headers;
              })()}

            {/* Sub-Headers for Utilized Man Power */}
            <TableHead className="border">Sewing Machine Operators</TableHead>
            <TableHead className="border">Helpers</TableHead>
            <TableHead className="border">Iron Machine Operators</TableHead>

            {/* Sub-Headers for OBB Man Power */}
            <TableHead className="border">Sewing Machine Operators</TableHead>
            <TableHead className="border">Helpers</TableHead>
            <TableHead className="border">Iron Machine Operators</TableHead>

            {/* Sub-Headers for Target Working */}
            <TableHead className="border">Hour</TableHead>
            <TableHead className="border">Min</TableHead>

            {/* Sub-Headers for Working */}
            <TableHead className="border">Hour</TableHead>
            <TableHead className="border">Min</TableHead>

            {/* Sub-Headers for Loss Working */}
            <TableHead className="border">Hour</TableHead>
            <TableHead className="border">Min</TableHead>

            {/* Sub-Headers for Daily Efficiency */}
            <TableHead className="border">Daily Plan Efficiency</TableHead>
            <TableHead className="border">Daily Overall Efficiency</TableHead>
            <TableHead className="border">Working Min (+/-)</TableHead>
            <TableHead className="border">Productivity pcs/hr</TableHead>

            {/* Sub-Headers for Costing */}
            <TableHead className="border">Sewing</TableHead>
            <TableHead className="border">Finishing</TableHead>
            <TableHead className="border">Cutting</TableHead>
            <TableHead className="border">Daily Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add table rows with data here */}
          {/* <TableRow>
            <TableCell colSpan={32} className="text-center">
              No data available
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
      </div>
    </>
  );
};

export default LineEfficiencyReport;
