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
import { getChecked, getDefects, getLine, getOperatorEfficiency, getUnits } from "./actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import { count } from "console";

const chartConfig = {
    target: {
        label: "No of Target",
        color: "hsl(var(--chart-1))",
    },
    count: {
        label: "Defects Per Hundred Units   ",
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
    obbSheetId?: string
    unit?:string
}

export type defectData = {
    target:number,
    count: number
}

const BarChartGraphEfficiencyRate = ({ date,unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<any[]>([])
    const [chartWidth, setChartWidth] = useState<number>(50);
    const [isSubmitting,setisSubmitting]=useState<boolean>(false)
    const chartRef = useRef<HTMLDivElement>(null);

    console.log("asdaidshbadbadbjahdba")
    const Fetchdata = async () => {
        try {
            
            setisSubmitting(true)
            

            const all = await getUnits()
            const defects= await getDefects(date)
            let checked = await getChecked(date)
            checked = Number( checked[0].total)
            console.log("aaa",checked)


            console.log("all",all)
            console.log("defects",defects)

        

            const abc = [
                {
                    "defectcount": "2",
                    "obbid": "ly8o5vu8-c9cFZB9SRxjo"
                  },
                  {
                    "defectcount": "8",
                    "obbid": "ly8o5vu8-c9cFZB9SRxjo"
                  },
                  {
                    "defectcount": "4",
                    "obbid": "lzs07i72-ojSke1Ky3mJh"
                  },
                  {
                    "defectcount": "10",
                    "obbid": "lzs07i72-ojSke1Ky3mJh"
                  },
                  {
                    "defectcount": "6",
                    "obbid": "m1nucu16-PI0WffR1I3aG"
                  },
                  {
                    "defectcount": "12",
                    "obbid": "m1nucu16-PI0WffR1I3aG"
                  },
                  {
                    "defectcount": "9",
                    "obbid": "m1nvreiv-OZ1R2mJCNZ7N"
                  },
                  {
                    "defectcount": "7",
                    "obbid": "m1nvreiv-OZ1R2mJCNZ7N"
                  },
                  {
                    "defectcount": "1",
                    "obbid": "m0uk89ef-wleHBGo6tNxf"
                  },
                  {
                    "defectcount": "15",
                    "obbid": "m0uk89ef-wleHBGo6tNxf"
                  },
                  {
                    "defectcount": "3",
                    "obbid": "m0uk89ef-wleHBGo6tNxf"
                  },
                  {
                    "defectcount": "5",
                    "obbid": "m1ymqeqg-AkTWQCe1QUAM"
                  },
                  {
                    "defectcount": "4",
                    "obbid": "m0rwlpgn-LBTJxmjBPbtw"
                  },
                  {
                    "defectcount": "6",
                    "obbid": "m0rwlpgn-LBTJxmjBPbtw"
                  }
              ]
            console.log("abc",abc)

            const defectsmap: { [key: string]: any[] } = {};
        defects.forEach(data => {
            if (!defectsmap[data.obbid]) {
                defectsmap[data.obbid] = [];
            }
            defectsmap[data.obbid].push(data);
        });
        console.log("map",defectsmap)

         const def = Object.values(defectsmap).map(d=>({
            obb: d[0].obbid,
            count: d.reduce((curr,next)=> curr+Number(next.defectcount),0)
         }))  

       





         console.log("first",def)

         const mergedData = all.map(obb => {
            const defect = def.find(defect => defect.obb === obb.obbid);
            return {
                ...obb,
                count: defect ? defect.count : 0 // Default to 0 if no defect count is found
            };
        });
        
        const newmerge = mergedData.filter(md=>md.units===unit)
        console.log("nm",newmerge)
        console.log("Merged Data:", mergedData);  

        const lineGroup :{ [key: string]: any[] } = {}
        newmerge.forEach(data => {
            if (!lineGroup[data.line]) {
                lineGroup[data.line] = [];
            }
            lineGroup[data.line ].push(data);
        });

        
        const final = Object.values(lineGroup).map(d=>({
            line: d[0].line,
            count:((( d.reduce((curr,next)=> curr+Number(next.count),0)/Number(checked))*100)).toFixed(2)
         }))  


        console.log("lg",lineGroup)
        console.log("final",final)


          

           
            setChartData(final)

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
    }, [date, unit])

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
    
    
       

            {chartData.length > 0 ?
                    // <div className='bg-slate-100 pt-5 -pl-8 rounded-lg border w-full mb-16 overflow-x-auto'>

                <div className='bg-slate-50 pt-5 -pl-8 rounded-lg border w-full h-[600px] mb-16'>
                 <Card className='bg-slate-50' >
               
                    <CardContent>
                        {/* <ChartContainer config={chartConfig} className={`min-h-[300px] max-h-[600px] w-[${chartWidth.toString()}%]`}> */}
                        <ChartContainer 
                        ref={chartRef}
                        config={chartConfig} className={`min-h-[300px] max-h-[550px]  `} >

                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                
                                margin={{
                                    top: 50,
                                    bottom: 50
                                }}
                                barGap={10}
                                className="h-[300px] "
                            >
                                <CartesianGrid vertical={false} />
                                <YAxis
                                    dataKey="count"
                                    type="number"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                />
                                <XAxis
                                    dataKey="line"
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

<ChartLegend content={<ChartLegendContent />} className="mt-2 text-sm" verticalAlign='bottom' />

                                
                                <Bar dataKey="count" fill="orange" radius={5} barSize={40}>
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