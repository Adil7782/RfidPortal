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
import { getChecked, getOperatorEfficiency } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
// import { getChecked } from "../../line-dhu/_components/actions";

const chartConfig = {
    defectCount: {
        label: "Sectional DHU",
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
}

export type defectData = {
    part:string,
    garment_count: number
}

const BarChartGraphEfficiencyRate = ({ date, obbSheetId }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectData[]>([])
    const [chartWidth, setChartWidth] = useState<number>(50);
    const [isSubmitting,setisSubmitting]=useState<boolean>(false)
    const chartRef = useRef<HTMLDivElement>(null);

    const Fetchdata = async () => {
        try {
            
            setisSubmitting(true)
            const prod = await getOperatorEfficiency(obbSheetId, date)
            const checked = await getChecked(date,obbSheetId)
            console.log("first",checked)
           
            console.log(prod)
           
            const chartData: any []= prod.map((item) => ({
                
                part:item.part,
                defectCount:Number((((Number(item.garment_count)/checked.total))*100).toFixed(1))

                
                

            })
            
            );
           console.log(chartData)
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
                        config={chartConfig}  >

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

                                <Bar dataKey="defectCount" fill="green" radius={5}>
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