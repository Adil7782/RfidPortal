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

const chartConfig = {
    target: {
        label: "Target",
        color: "hsl(var(--chart-1))",
    },
    actual: {
        label: "Actual",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface LineChartProps {
    hourlyTarget: (number | null)[];
    cuttingInCount: number;
    cuttingOutCount: number;
    frontGmtCount: number;
    backGmtCount: number;
    frontGmtQcCount: number;
    backGmtQcCount: number;
    productAssembleCount: number;
    productAssembleQcCount: number;
}

const LineChart = ({ 
    hourlyTarget,
    cuttingInCount,
    cuttingOutCount,
    frontGmtCount,
    backGmtCount,
    frontGmtQcCount,
    backGmtQcCount,
    productAssembleCount,
    productAssembleQcCount,
}: LineChartProps) => {
    const chartData = [
        { point: "Cutting IN", target: hourlyTarget[0], actual: cuttingInCount },
        { point: "Cutiing OUT", target: hourlyTarget[1], actual: cuttingOutCount },
        { point: "GMT FRONT IN", target: hourlyTarget[2], actual: frontGmtCount },
        { point: "GMT BACK IN", target: hourlyTarget[3], actual: backGmtCount },
        { point: "GMT FRONT QC", target: hourlyTarget[4], actual: frontGmtQcCount },
        { point: "GMT BACK QC", target: hourlyTarget[5], actual: backGmtQcCount },
        { point: "Assemble Point", target: hourlyTarget[6], actual: productAssembleCount },
        { point: "Assemble QC", target: hourlyTarget[7], actual: productAssembleQcCount },
    ];

    return (
        <Card className='my-16 pr-2 pt-6 pb-4 border rounded-xl bg-slate-50'>
            <div className="px-8">
                <CardHeader>
                    <CardTitle>Line Chart - Target vs Actual</CardTitle>
                    <CardDescription>Number of items came across each scanning points today</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[576px] max-h-[800px] w-full">
                    <BarChart 
                        accessibilityLayer 
                        data={chartData}
                        margin={{
                            top: 30,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="target"
                            type="number"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis
                            dataKey="point"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} className="mt-2 text-sm"/>
                        <Bar dataKey="target" fill="var(--color-target)" radius={5}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={14}
                            />
                        </Bar>
                        <Bar dataKey="actual" fill="var(--color-actual)" radius={5}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={14}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default LineChart