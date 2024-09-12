"use client"

import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    LabelList,
    XAxis, 
    YAxis
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getDefects } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";


const chartConfig = {
    def: {
        label: "Defects",
        color: "hsl(var(--chart-1))",
    },
   
} satisfies ChartConfig



export type defectsData = {
    defectcount:number;
    name:string;
   
}

interface BarChartGraphProps {
    date: string
    obbSheetId: string
}



const BarChartGraphDefects = ({ date, obbSheetId }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectsData[]>([])
    const [productionData, setProductionData] = useState<defectsData[]>([]);

    const[chartWidth,setChartWidth] = useState<number>(100)
    const[isSubmitting,setisSubmitting]=useState<boolean>(false)

    const chartRef = useRef<HTMLDivElement>(null);


    const getdef = async () => {
        setisSubmitting(true)
        const resp :any= await getDefects(obbSheetId,date+"%");
        console.log("defects",resp)

        console.log("dataaaaa",date,obbSheetId)

        const chartData1: defectsData[] = resp.map((item:any) => ({
            name:item.name,
            defectcount:item.defectcount,
         }));
         console.log("defect count:", chartData1.map(item => item.defectcount));
         setProductionData(chartData1)
         setChartData(chartData1)


        setisSubmitting(false)
    }

    
    useEffect(() => {
      
        getdef();
        
    }, [date,obbSheetId])
   
  

    return (
        <>
        <div className="justify-center">
        <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
        </div>

        {chartData.length>0 ?(
 <Card className='pr-2 pt-6 pb-4 border rounded-xl bg-slate-50 w-fit'style={{width:chartWidth+"%"}} >
         
 <CardContent className="w-auto h-auto" style={{width:chartWidth+"%"}}  >
    <ChartContainer ref={chartRef} config={chartConfig} className="h-auto w-auto"  style={{width:chartWidth+"%"}} >
  <BarChart 
     accessibilityLayer 
     data={chartData}
     margin={{
         top:100,
         bottom: 150
     }}
     startAngle={10}
      >
     <CartesianGrid vertical={false} />
     <YAxis
         dataKey="defectcount"
         type="number"
         tickLine={true}
         tickMargin={10}
         axisLine={false}
     />
     <XAxis
         dataKey="name"
         tickLine={false}
         tickMargin={70}
         axisLine={false}
         angle={90}
         fontSize={11}
         // fontFamily="Inter"
         // fontWeight={600}
         // className="z-[999]"
         interval={0}
         textAnchor="start"
     />
     <ChartTooltip
         cursor={false}
         content={<ChartTooltipContent indicator="line" />}
     />
     {/* <ChartLegend 
         content={<ChartLegendContent />} 
         className="-mb-10 text-xs text-blue-500 font-bold" 
         margin={{top:10}}
             
     /> */}
     <Bar dataKey="defectcount" fill="var(--color-def)" radius={5} barSize={25} >
    
         <LabelList
             position="top"
             // content={renderCustomLabel}
             offset={12}
             className="fill-foreground"
             fontSize={11}
             fontFamily="Inter"
         />
     </Bar>
 
 </BarChart>
</ChartContainer>
</CardContent>
     
       
    </Card>
        ):(
            <div className="flex justify-center items-top h-screen">
                <h3>No Data Available</h3>
            </div>
        )
       
    }
        {/* {chartData.length > 0 && (
      <div className="flex flex-col items-center mt-5">
        <div className="flex gap-2">
          <Button onClick={() => setChartWidth((p) => p + 20)} className="rounded-full bg-gray-300">
            +
          </Button>
          <Button onClick={() => setChartWidth((p) => p - 20)} className="rounded-full bg-gray-300">
            -
          </Button>
        </div>

      </div>
    )} */}

     
        </>
    )
}

export default BarChartGraphDefects