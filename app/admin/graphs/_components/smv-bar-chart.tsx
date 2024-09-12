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
import { getDefects, getSMV } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

const chartConfig = {
    smv: {
        label: "Defects",
        color: "hsl(var(--chart-1))",
    },
    avg: {
        // label: "Cycle Time",
        // color: "hsl(var(--chart-2))",
    },
    realavg: {
        // label: "Average",
        // color: "hsl(var(--chart-3))",
    }
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
}



const BarChartGraphOpSmv = ({ date, obbSheetId }: BarChartGraphProps) => {
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
            smv:item.count,
         //    avg:Number(item.avg.toFixed(2))
        //   avg:Number(parseFloat(item.avg.toString()).toFixed(2)),
        //   realavg:Math.floor(((((Number(parseFloat(item.avg.toString()).toFixed(2)))/item.smv)))*100)+"%",

         }));
        //  console.log("AVG values:", chartData1.map(item => item.avg));
         setProductionData(chartData1)
         setChartData(chartData1)


        setisSubmitting(false)
    }

    // const Fetchdata = async () => {
        
    //     try {
    //         setisSubmitting(true)
    //         const resp = await getDefects();
    //         console.log("defects",resp)
    //     const prod = await getSMV(obbSheetId, date)
    //     // setProductionData(prod)
        
              
      
    //         const chartData1: BarChartData[] = prod.map((item) => ({
    //            name:item.name+"-"+"( "+item.machineId+" )",
    //            smv:item.smv,
    //         //    avg:Number(item.avg.toFixed(2))
    //          avg:Number(parseFloat(item.avg.toString()).toFixed(2)),
    //          realavg:Math.floor(((((Number(parseFloat(item.avg.toString()).toFixed(2)))/item.smv)))*100)+"%",

    //         }));
    //         console.log("AVG values:", chartData1.map(item => item.avg));
    //         setProductionData(chartData1)
    //         setChartData(chartData1)
    //         console.log("chart data",chartData1)
            
            
    //         } 
    //         catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    //     setisSubmitting(false)
        
    // };

    // useEffect(() => {

        
    //     if(obbSheetId){
    //     Fetchdata()
    //     }
    // }, [obbSheetId,date])
    useEffect(() => {

        if(obbSheetId){
        getdef();
        }
    }, [date,obbSheetId])
    // useEffect(()=>{
    //     console.log("1firstq")
    // },[])
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         Fetchdata();
    //     }, 60000); 
    
    //     return () => clearInterval(interval);
    // }, [date, obbSheetId]);
   

//create pdf




// const renderCustomLabel = ({ x, y, width, value, index }: any) => {
//     const realAvgValue = chartData[index]?.realavg || 0;
//     return (
//         <text x={x + width -5} y={y - 5} fill="black" fontSize={11} fontFamily="Inter">
//             {`${value} (${realAvgValue})`}
//         </text>
//     );
// };



    return (
        <>
        <div className="justify-center">
        <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
        </div>

       






        <div className=' pt-5 -pl-8  bg-slate-50 rounded-lg border w-full mb-16 overflow-x-auto'>
        <Card className='pr-2 pt-6 pb-4 border rounded-xl bg-slate-50 w-fit'style={{width:chartWidth+"%"}} >
            {/* <div className="px-8">
                <CardHeader>
                    <CardTitle>SMV vs Cycle Time</CardTitle>
                    <CardDescription>Number of items came across each scanning points today</CardDescription>
                </CardHeader>
            </div> */}
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
                            dataKey="smv"
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
                        <ChartLegend 
                            content={<ChartLegendContent />} 
                            className="-mb-10 text-xs text-blue-500 font-bold" 
                            margin={{top:10}}
                                
                        />
                        <Bar dataKey="smv" fill="var(--color-smv)" radius={15} barSize={5}>
                            <LabelList
                                position="top"
                                // content={renderCustomLabel}
                                offset={12}
                                className="fill-foreground"
                                fontSize={11}
                                fontFamily="Inter"
                            />
                        </Bar>
                         <Bar dataKey="avg" fill="var(--color-avg)" radius={15} barSize={5}>
                            <LabelList
                                position="top"
                                offset={12}
                                
                                className="fill-foreground"
                                fontSize={11}
                                fontFamily="Inter"
                            />
                        </Bar>
                         {/* <Bar dataKey="realavg" fill="brown" radius={5} barSize={5}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={11}
                                fontFamily="Inter"
                            />
                        </Bar> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
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