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
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";

interface BarChartComponentProps {
    sectionCounts: SectionCountsType[];
    frontGmtCount: number;
    backGmtCount: number;
}

const chartConfig = {
    product: {
      label: "Product Count",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const BarChartComponent = ({
    sectionCounts,
    frontGmtCount,
    backGmtCount,
}: BarChartComponentProps) => {
    const chartData = [
        { point: "GMT-Front", product: frontGmtCount === 0 ? null : frontGmtCount},
        { point: "GMT-Back", product: backGmtCount === 0 ? null : backGmtCount },
        { point: "Assemble", product: sectionCounts[0].productCount },
        { point: "Assemble QC", product: sectionCounts[1].productCount },
        { point: "Button QC", product: sectionCounts[2].productCount },
        { point: "Button OUT", product: sectionCounts[3].productCount },
        { point: "Wash IN", product: sectionCounts[4].productCount },
        { point: "Dry QC", product: sectionCounts[5].productCount },
        { point: "Wet QC", product: sectionCounts[6].productCount },
        { point: "Wash OUT", product: sectionCounts[7].productCount },
        { point: "Finish IN", product: sectionCounts[8].productCount },
        { point: "Finish Line IN", product: sectionCounts[9].productCount },
        { point: "Finish Line QC", product: sectionCounts[10].productCount },
        { point: "Finish OUT", product: sectionCounts[11].productCount },
        { point: "Pack IN", product: sectionCounts[12].productCount },
    ];

    return (
        <Card className='my-4 pr-2 pt-6 pb-4 border rounded-xl bg-slate-50'>
            <div className="px-8">
                <CardHeader>
                    <CardTitle>Bar Chart - GMT Product Count</CardTitle>
                    <CardDescription>Number of the products currently available on each scanning points</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[576px] w-full">
                    <BarChart 
                        accessibilityLayer 
                        data={chartData}
                        margin={{
                            top: 30,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="product"
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
                        <Bar dataKey="product" fill="var(--color-product)" radius={5}>
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

export default BarChartComponent