"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { parseISO, getHours } from 'date-fns';

import { useToast } from "@/components/ui/use-toast";

import { date } from "zod";

import SelectScanningPointAndDate from "./select-scanning-point-and-date";
import BarChartGraphOpSmv from "./all-defect-chart";

interface AnalyticsChartProps {
    title:string;
}

 export type SMVChartData = {
  count:number;
  name:string;
};




const AnalyticsChart = ({
   
    title
}: AnalyticsChartProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [barchartData, setBarchartData] = useState<SMVChartData[]>([]);
    const [obbSheetId, setObbSheetId] = useState<string>("");
    const [date, setDate] = useState<string>("");


    const handleFetchSmv = async (data: { obbSheetId: string; date: Date }) => {
        try {
            
            // console.log(data.date,data.obbSheetId)
            data.date.setDate(data.date.getDate() + 1);
            //const formattedDate = data.date.toISOString().split('T')[0];
            const formattedDate = data.date.toISOString().split('T')[0].toString()  ;
            setDate(formattedDate);
            setObbSheetId(data.obbSheetId);
            
            // console.log("obbSheetId",obbSheetId)
            // console.log("date",formattedDate)
        
            // router.refresh();
            // router.refresh();
          
        } catch (error: any) {
            console.error("Error fetching production data:", error);
            toast({
                title: "Something went wrong! Try again",
                variant: "error"
            });
        }
    }

    return (
        <>
            <div className="mx-auto max-w-7xl">
                {/* <SelectObbSheetAndDate
                    obbSheets={obbSheets}
                    handleSubmit={handleFetchSmv}
                /> */}

            <SelectScanningPointAndDate
                
                handleSubmit={handleFetchSmv}
            />
            </div>
            <div className="mx-auto max-w-[1680px]">
                {/* {barchartData.length > 0 ? */}
                    <div className="mt-12">
                        <BarChartGraphOpSmv 
                            obbSheetId={obbSheetId}
                            date={date}
                                         
                        />
                    </div>
                    :
                    <div className="mt-12 w-full">
                        <p className="text-center text-slate-500">Please select the OBB sheet, operation, and date ☝️</p>
                    </div>
                 {/* } */}
            </div>
        </>
    )
}

export default AnalyticsChart