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
import { getDefects, getDefectsLine, getSMV } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import { getAll } from "@/app/(tv-charts)/line-eff/[unit]/_components/actions";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

const chartConfig = {
    smv: {
        label: "Defects",
        color: "hsl(var(--chart-1))",
    },
    // avg: {
    //     // label: "Cycle Time",
    //     // color: "hsl(var(--chart-2))",
    // },
    // realavg: {
    //     // label: "Average",
    //     // color: "hsl(var(--chart-3))",
    // }
} satisfies ChartConfig

type BarChartData = {
    smv:number;
    name:string;
    avg: number;
    machineId?:string;
    realavg?:any;
};

type defectsData = {
    count:number;
    name:string;
    qc:string;
}

interface BarChartGraphProps {
    date: string
    obbSheetId: string
    partArea:string
    unit:any
    
}

export interface QualityControlIssue {
    count: string;
    qcStatus: string;
    name: string;
    part: string;
    obbSheetId?: string;
  }


const BarChartGraphOpSmv = ({ date, obbSheetId,partArea,unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectsData[]>([])
    const [productionData, setProductionData] = useState<defectsData[]>([]);

    const[chartWidth,setChartWidth] = useState<number>(100)
    const[isSubmitting,setisSubmitting]=useState<boolean>(false)

    console.log("first")
    const chartRef = useRef<HTMLDivElement>(null);


    const getdef = async () => {
        setisSubmitting(true)
        
        let resp :QualityControlIssue [];

        if(partArea != "line"){
            resp = await getDefects(obbSheetId,date+"%",partArea);
        }
        else{
            resp= await getDefectsLine(obbSheetId,date+"%");
        }
        
        // console.log("defects",resp)

        // console.log("dataaaaa",date,obbSheetId)
        console.log(resp)

        const all = await getAll()


        

        console.log("asd",all)
        

        //  const newmap = resp.map((a)=>{
        //     const found = all.find(b=>b.obbid==a.obbSheetId)
        //     return{
        //       ...a,...found
        //     }
        //   })
        //   console.log("newmap",newmap)

        const newMap =  resp.map((r)=>{
            const found = all.find((a)=>a.obbid == r.obbSheetId)
            return{
                ...r,...found
            }
        })

        console.log("asd",newMap)

        const filteredData =  newMap.filter((md:any)=>md.obbstyle===unit).slice(0,5)

          

        const chartData1: any[] = filteredData.map((item:any) => ({
            name:item.name+" - "+item.part,
            smv:Number(item.count),


    
         }));
        //  console.log("AVG values:", chartData1.map(item => item.avg));
         setProductionData(chartData1)
         setChartData(chartData1)


        setisSubmitting(false)
    }

    useEffect(() => {

        if(unit){
        getdef();
        }
    }, [date,obbSheetId,partArea])
  





    return (
        <>
        <div className="justify-center">
        <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
        </div>

       






        <div className='  w-full mb-16 overflow-x-auto'>
        {chartData.length > 0 ? (
        <Card className='bg-slate-50 shadow-md' >
            
            <CardContent className=""  >
                <ChartContainer ref={chartRef} config={chartConfig} className={`max-h-[430px] w-full   `}  >
                    <BarChart 
                        accessibilityLayer 
                        data={chartData}
                        margin={{
                            top:10,
                            bottom: 20
                        }}
                        startAngle={10}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="smv"
                            type="number"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            // angle={90}
                            fontSize={11}
                            // fontFamily="Inter"
                            // fontWeight={600}
                            // className="z-[999]"
                            interval={0}
                            // textAnchor="start"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <ChartLegend 
                            content={<ChartLegendContent />} 
                            verticalAlign="top"
                                
                        />
                        <Bar dataKey="smv" fill="var(--color-smv)" radius={5} barSize={25}>
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
    ) : (
        <div className="mt-12 w-full">
          <p className="text-center text-slate-500">No Data Available...</p>
        </div>
      )
      }
        </div>
        {chartData.length > 0 && (
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
    )}

     
        </>
    )
}

export default BarChartGraphOpSmv