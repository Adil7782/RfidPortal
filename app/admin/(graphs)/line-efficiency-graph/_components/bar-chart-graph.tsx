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
import { getAll, getCount, getTarget } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import { TableCompo } from "./table-compo";
import { fetchProductDefectsWithOperations } from "@/actions/qc/product/fetch-product-defects-with-operations";
import { calculateDhuAndAnalyzeDefects as TotalCount } from '@/actions/qc/product/calculate-dhu-and-analyze-defects';
import { calculateTotals } from "@/components/templates/report/day-end-line-allqc-report-template";

const chartConfig = {
    efficiency: {
        label: "Efficiency",
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
    efficiency:number,
    lineName:string,
    unitName:string
    name:string
}
export  interface OperationBlock {
    obbid: string;   // Unique identifier for the operation block
    obbname: string; // Name of the operation block
    unitid: string;  // Identifier for the unit
    linename: string; // Name of the production line
    unitname: string; // Name of the unit
    obbstyle:string;
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

export interface LineData {

    unitId: string;              

    obbSheetId: string;          
    utilizedManPowers: number;  
    totalSMV: number;

    workingHours: number;        

}
 export interface ProductionMetrics {

    efficiency: number;

    lineName: string;

    unitName: string;

    name: string;

    smv: number;

    manPower: number;

}
const BarChartGraphEfficiencyRate = ({ date, unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<defectData[]>([])
    const [chartWidth, setChartWidth] = useState<number>(50);
    const[dates,setDates]=useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [endData, setEndData] = useState<any []>([]);
    const chartRef = useRef<HTMLDivElement>(null);

    const Fetchdata = async () => {
        if (!date ||  !unit) return; // Ensure all required inputs are defined

        try {
            setIsSubmitting(true);

            // Fetch data based on obbSheetId, date, and unit
            const count = await getCount( date);
            const target = await getTarget(date);
            const all = await getAll();
            const productLineEndDefects = await fetchProductDefectsWithOperations({ part: "line-end", date: date });
            const lineEndResults = TotalCount(productLineEndDefects);
            const totals = calculateTotals(lineEndResults.hourlyQuantity);
            console.log("asa",count)

            const obbMap = all.map((a) => {
                const countf = count.find((c) => c.obbSheetId === a.obbid);
                const targetf = target.find((c) => c.obbSheetId === a.obbid);
                return { ...a, ...countf, ...targetf ,...totals};
            });

            const newobbMap = obbMap.filter((o) => o.unitid === unit);

            console.log("asdasdasd",newobbMap)
            const endData = newobbMap.map((n) => {
                const earnMins = ((n.totalSMV ?? 0) * Number(n.inspectQty));
                const prod = ((n.utilizedManPowers ?? 0) * (n.workingHours ?? 0) * 60); // Default to 0 if undefined
                const efficiency = prod !== 0 ? Number(((earnMins / prod) * 100).toFixed(1)) : 0; // Avoid division by zero
                const ins = prod !== 0 ? n.inspectQty: 0; // Avoid division by zero

                return {
                    efficiency,
                    lineName: n.linename,
                    unitName: n.unitname,
                    name:  n.linename+"-"+n.obbstyle,
                    smv:n.totalSMV,
                    manPower:n.utilizedManPowers,
                    count: ins,
                    hours:n.workingHours,
                    obbstyle:n.obbstyle
                };
            });

            setChartData(endData);
            setEndData(endData)
            console.log("date",date)
            setDates(date)

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        Fetchdata();
        const chartWidths = Math.min(250, 110 + (chartData.length * 2));
        setChartWidth(chartWidths);
    }, [date, unit]); // Include `unit` as a dependency

    useEffect(() => {
        const interval = setInterval(() => {
            Fetchdata();
        }, 60000);

        return () => clearInterval(interval);
    }, [date, unit]);

    return (
        <>
    
            <div className="flex justify-center ">
                
                
               
                
                <Loader2 className={cn("animate-spin w-7 h-7 hidden", isSubmitting && "flex")} />
            </div>

            { (unit && date) ? 
            <div>
            {chartData.length > 0 ? (
                <div className='mb-16'>
                    <Card className='bg-slate-50'>
                        <CardContent>
                            <ChartContainer 
                                ref={chartRef}
                                config={chartConfig} 
                                className={`min-h-[300px] max-h-[450px]`}
                            >
                                <BarChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        bottom: 50
                                    }}
                                    barGap={10}
                                >
                                    <CartesianGrid vertical={false} />
                                    <YAxis
                                        dataKey="efficiency"
                                        type="number"
                                        tickLine={true}
                                        tickMargin={10}
                                        axisLine={true}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={true}
                                        tickMargin={10}
                                        axisLine={true}
                                        interval={0}
                                        // angle={90}
                                        // textAnchor="start"
                                        fontStyle={"arial"}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <ChartLegend content={<ChartLegendContent />} className="mt-2 text-sm" verticalAlign='top' />
                                    <Bar dataKey="efficiency" fill="orange" radius={5}>
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
            ) : (
                <div className="mt-12 w-full">
                    <p className="text-center text-slate-500">No Data Available.</p>
                </div>
            )}
            </div> : (
                <div className="mt-12 w-full">
                <p className="text-center text-slate-500">Please Select Unit and Date...</p>
            </div>
            )}
        </>
    );
}

export default BarChartGraphEfficiencyRate;