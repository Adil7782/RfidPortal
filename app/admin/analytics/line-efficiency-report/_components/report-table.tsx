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
    <div>
    <div>
    <SelectUnitLineDate handleSubmit={handleUnitObbDate} />
    </div>
      
     <div className="mt-5">
      <Table>
      
         
      </Table>
      </div>
    </div>
  );
};

export default LineEfficiencyReport;
