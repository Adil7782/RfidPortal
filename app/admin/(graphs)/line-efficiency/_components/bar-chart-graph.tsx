"use client"
// import { FaPlus, FaMinus } from 'react-icons/fa';
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
import { use, useEffect, useState } from "react";
import { getAll, getCount, getOperatorEfficiency, getTarget } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';

const chartConfig = {
    defectCount: {
        label: "No of Defective Garments",
        color: "hsl(var(--chart-1))",
    },

} satisfies ChartConfig
type BarChartData = {
    name: string;
    count: number;
    target: number;
    ratio: number;
    seqNo?:string
}
interface BarChartGraphProps {

    date: string
    obbSheetId: string
    unit:any
}

export type defectData = {
    part:string,
    garment_count: number
}
export  interface OperationBlock {
    obbid: string;   // Unique identifier for the operation block
    obbname: string; // Name of the operation block
    unitid: string;  // Identifier for the unit
    linename: string; // Name of the production line
    unitname: string; // Name of the unit
  }
export interface QCRecord {

    id: string;

    timestamp: Date;

    productId: string;

    createdAt: Date;

    qcStatus: string;

    qcPointId: string;

    obbOperationId: string;

    operatorId: string;

    operatorName: string;

    obbSheetId: string;

}

export interface LineEfficiency {
    id: string;
    unitId: string;
    obbSheetId: string;
    date: string;
    sewingOperators: number;
    ironOperators: number;
    helpers: number;
    manPowers: number;
    frontQcTarget: number;
    backQcTarget: number;
    endQcTarget: number;
    workingHours: number;
    totalSMV: number;
    targetEfficiency: number;
  }

const BarChartGraphEfficiencyRate = ({ date, obbSheetId,unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectData[]>([])
    const [chartWidth, setChartWidth] = useState<number>(50);
    const [isSubmitting,setisSubmitting]=useState<boolean>(false)
    const chartRef = useRef<HTMLDivElement>(null);


    const Fetchdata = async () => {
        try {
            
            setisSubmitting(true)
            console.log(date)
            const prod = await getOperatorEfficiency(obbSheetId, date)
            const count = await getCount(obbSheetId, date)
            const target = await getTarget()
            const all = await getAll()

            

            console.log("all",all)
            console.log("count",count)
            console.log("target",target)
            console.log("target",target)

            

         
           

           
            const chartData: any []= prod.map((item) => ({
                
                part:item.part,
                defectCount:item.garment_count

                
                

            })
            
            );
           
            setChartData(chartData)

        }

        catch (error) {
            console.error("Error fetching data:", error);
        }
        setisSubmitting(false)

    };



    useEffect(() => {
        Fetchdata()
        const chartWidths = Math.min(250, 110 + (chartData.length * 2));

    setChartWidth(chartWidths)
    }, [date, obbSheetId])

    useEffect(() => {
        const interval = setInterval(() => {
            Fetchdata();
        }, 60000);

        return () => clearInterval(interval);
    }, [date, obbSheetId]);





    return (
        <>
  <div className="flex justify-center ">
        <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
       </div>
    
    
       

            {chartData.length > 0 ?
                    // <div className='bg-slate-100 pt-5 -pl-8 rounded-lg border w-full mb-16 overflow-x-auto'>

                <div className=' mb-16'>
                 <Card className='bg-slate-50' >
               
                    <CardContent>
                        {/* <ChartContainer config={chartConfig} className={`min-h-[300px] max-h-[600px] w-[${chartWidth.toString()}%]`}> */}
                        <ChartContainer 
                        ref={chartRef}
                        config={chartConfig} className={`min-h-[300px] max-h-[450px] `} >

                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                
                                margin={{
                                    top: 100,
                                    bottom: 50
                                }}
                                barGap={10}
                                
                            >
                                <CartesianGrid vertical={false} />
                                <YAxis
                                    dataKey="defectCount"
                                    type="number"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                />
                                <XAxis
                                    dataKey="part"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                    angle={90}
                                    interval={0}
                                    textAnchor='start'
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="line" />}
                                />

<ChartLegend content={<ChartLegendContent />} className="mt-2 text-sm" verticalAlign='bottom' />

                                <Bar dataKey="defectCount" fill="orange" radius={5}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                               
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                </div>
                : <div className="mt-12 w-full">
                    <p className="text-center text-slate-500">No Data Available.</p>
                </div>
            }
           
            
        </>
    )
}

export default BarChartGraphEfficiencyRate