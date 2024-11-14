"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { ProductionData } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";

import LogoImporter from "@/components/ui/eliot-logo";
import BarChartGraphOpSmv from "./smv-bar-chart";
// import SelectObbSheetAndDate  from "@/components/dashboard/common/select-obbsheet-and-date";




interface AnalyticsChartProps {
    units:string;
    obbSheets: {
        id: string;
        name: string;
    }[] | null;

    
}

export type ProductionDataType = {
    seqNo?: string;
    seqno?: string;
    name: string;
    count: number;
    target: number;
}

const EfficiencyAnalyticsChart = ({
    unitparam
}: any) => {
    const { toast } = useToast();
    const router = useRouter();

    const [production, setProduction] = useState<ProductionDataType[]>([]);
    const [userMessage,setUserMessage]=useState<string>("Please select style and date")
    const [filterApplied,setFilterApplied]=useState<boolean>(false)
    const [obbSheetId,setObbSheetId]=useState<string>(" ")
    const[date,setDate]=useState<string>("")
    const[unit,setUnit]=useState<string>("")
    const [partArea, setPartArea] = useState<string>("line");

    

   
    useEffect(() => {

        const y = new Date().getFullYear().toString()
        const m = (new Date().getMonth() + 1).toString().padStart(2, "0")
        //const d = new Date().getDate().toString().padStart(2, "0")
        const today = new Date();
        const yyyyMMdd = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
      
       const date =  yyyyMMdd.toString()+"%"
        setDate(date)
        const u= "Unit "+unitparam
        console.log("uuu",u)
        setUnit(u)
        console.log("Build done")
    
      }, [])
    

    
      useEffect(()=>{
        if(filterApplied){
            setUserMessage("No data available.")
        }
        
      },[filterApplied])
    return (
        <>

<>
          <div className="h-[200]">
      <div className='flex justify-center items-center gap-3 w-screen'>
        {/* <Cog className='w-7 h-7 text-voilet' /> */}
        <LogoImporter/>
        <h1 className='text-[#0071c1] my-4 text-3xl '>Dashboard - Top - Unit {unitparam}</h1>
      </div>

      {(unit && date ) ? 
      <BarChartGraphOpSmv 
      obbSheetId={obbSheetId}
      date={date}
      partArea={partArea}
      unit={unit}

                   
  />
      : <span> <p className="text-center text-slate-500">{userMessage}</p></span>}
    </div>
   
           
        </>
{/*            
            <div className="mx-auto max-w-[1680px]">
                {(unit && date) ?
                    <div className="my-8">
                        
                        <BarChartGraphEfficiencyRate
                            unit={unit}
                            date={date}
                           
                            
                        />
                    </div>
                    :
                    <div className="mt-12 w-full">
                        <p className="text-center text-slate-500">{userMessage}</p>
                    </div>
                }
            </div> */}
        </>
    )
}

export default EfficiencyAnalyticsChart