"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { ProductionData } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";
import SelectObbSheetAndDate from "./unit-date";
import TabCompo from "./tab-compo";
// import SelectObbSheetAndDate  from "@/components/dashboard/common/select-obbsheet-and-date";
// import BarChartGraph from "./bar-chart-graph";



interface AnalyticsChartProps {
    units: {
        id: string;
        name: string;
    }[] | null;

        // sectionCounts: SectionCountsType[];
        frontGmtCount: number;
        backGmtCount: number;
        products:any
   
}

export type ProductionDataType = {
    seqNo?: string;
    seqno?: string;
    name: string;
    count: number;
    target: number;
}

const EfficiencyAnalyticsChart = ({
    units,frontGmtCount,
    backGmtCount,products
}: AnalyticsChartProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [production, setProduction] = useState<ProductionDataType[]>([]);
    const [userMessage,setUserMessage]=useState<string>("Please select Unit and Date")
    const [filterApplied,setFilterApplied]=useState<boolean>(false)
    const [obbSheetId,setObbSheetId]=useState<string>("")
    const[date,setDate]=useState<string>("")
    
    // console.log(units)


    
    const Fetchdata = async (data: { unit: string; date: Date }) => {
        try {
            const y=data.date.getFullYear().toString()
            const m=(data.date.getMonth() + 1).toString().padStart(2,"0")
            const d=data.date.getDate().toString().padStart(2,"0")
            // setObbSheetId(data.obbSheetId)
            setDate(`${y}-${m}-${d}`)
            // console.log("as",data.unit)
            setFilterApplied(true)
            
        } catch (error) {
          console.error("Error fetching data:", error);
        }
       
      };
    
      useEffect(()=>{
        if(filterApplied){
            setUserMessage("No data available.")
        }
        
      },[filterApplied])
    
   

     
    return (
        <>
            {/* <div className="mx-auto max-w-7xl">
                <SelectObbSheetAndDate 
                    units={units}
                    handleSubmit={Fetchdata}                />
            </div> */}
            <div className="mx-auto max-w-[1680px]">
             
                    <div className="my-2">
                        
                        {/* <BarChartGraph
                            obbSheetId={obbSheetId}
                            date={date}
                           
                            
                        /> */}
                        <TabCompo
                        frontGmtCount={frontGmtCount}
                        backGmtCount={backGmtCount}
                        products={products}
                        date={date}
                        
                         
                         ></TabCompo>
                    </div>
                   
              
            </div>
        </>
    )
}

export default EfficiencyAnalyticsChart