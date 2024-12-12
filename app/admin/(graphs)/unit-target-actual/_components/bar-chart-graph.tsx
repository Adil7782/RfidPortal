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

import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import { getAll, getCount, getTarget } from "./actions";

const chartConfig = {
    target: {
        label: "Target QTY",
        color: "hsl(var(--chart-1))",
    },
    count: {
        label: "Production QTY",
        color: "hsl(var(--chart-2))",
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
    unit:string
}

export type defectData = {
    target:number,
    count: number
}
export type lineTarget ={
    obbid:string
target:number
line:string
}

const BarChartGraphEfficiencyRate = ({ date, obbSheetId,unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectData[]>([])
    const [chartWidth, setChartWidth] = useState<number>(50);
    const [isSubmitting,setisSubmitting]=useState<boolean>(false)
    const chartRef = useRef<HTMLDivElement>(null);

    const Fetchdata = async () => {
        try {
            
            setisSubmitting(true)

            
            const target = await getTarget(date)
            const count = await getCount(date)
            const all = await getAll()
            console.log("AAAA",count)
          

            const obbMap = all.map((a)=>{
                const targetf = target.find((t)=>t.obbid===a.obbid)
                const countf = count.find((c)=>c.obbid===a.obbid)
                return {...a, count:Number(countf?.count) || 0,target:targetf?.target || 0}
            })
           


            const newMap = target.map((t)=>{
                const found = count.find((c)=> c.obbid === t.obbid)
                 return {...t, count:Number(found?.count) || 0}
            })
           
            const finalMap = obbMap.map((d)=>{
                const large = Math.max(d.count, d.target)
                return{
                    ...d,Largest:large
                }

            })

          
          
             const filteredMap = finalMap.filter((f)=>f.unitid===unit)
            
            setChartData(filteredMap)
           
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
        }, 900000);

        return () => clearInterval(interval);
    }, [date, obbSheetId,unit]);



    


    return (
        <>
  <div className="flex justify-center ">
        <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
       </div>
    
    
       

            {chartData.length > 0 ?
                    // <div className='bg-slate-100 pt-5 -pl-8 rounded-lg border w-full mb-16 overflow-x-auto'>

                <div className='bg-slate-50 pt-5 -pl-8 rounded-lg border w-full h-[450px] mb-16'>
                 <Card className='bg-slate-50' >
               
                    <CardContent>
                        {/* <ChartContainer config={chartConfig} className={`min-h-[300px] max-h-[600px] w-[${chartWidth.toString()}%]`}> */}
                        <ChartContainer 
                        ref={chartRef}
                        config={chartConfig} className={`min-h-[300px] max-h-[750px]  `} >

                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                
                                margin={{
                                    top: 0,
                                    bottom: 50
                                }}
                                barGap={10}
                                className="h-[300px] "
                            >
                                <CartesianGrid vertical={false} />
                                <YAxis
                                    dataKey="Largest"
                                    type="number"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                />
                                <XAxis
                                    dataKey="linename"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                  
                                    interval={0}
                                    // textAnchor='start'
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="line" />}
                                />

<ChartLegend content={<ChartLegendContent />} className="mt-2 text-sm" verticalAlign='top' />

                                <Bar dataKey="target" fill="green" radius={5}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                                <Bar dataKey="count" fill="orange" radius={5}>
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