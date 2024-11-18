"use client";
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
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { getCount, ProductDefect } from "./actions";

interface BarChartGraphProps {
    date: string;
    obbSheetId: string;
    unit: string;
}

const TableCompo = ({ date, obbSheetId, unit }: BarChartGraphProps) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [chartWidth, setChartWidth] = useState<number>(50);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const chartRef = useRef<HTMLDivElement>(null);

    const GroupData = (defects: ProductDefect[]) => {
        const groupedData: Record<string, number> = {};

        defects.forEach(defect => {
            const hourKey = new Date(defect.timestamp).toString().slice(0, 13);
            if (!groupedData[hourKey]) {
                groupedData[hourKey] = 0;
            }
            groupedData[hourKey]++;
        });
        console.log("gd",groupedData)

        // Convert grouped data to array format for chart
        const chartDataArray = Object.keys(groupedData).map(hour => ({
            hour,
            count: groupedData[hour],
        }));

        setChartData(chartDataArray);
    };

    const Fetchdata = async () => {
        try {
            setIsSubmitting(true);
            const defects = await getCount();
            GroupData(defects);
            console.log("Fetched defects:", defects);
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
    }, [date, obbSheetId]);

    useEffect(() => {
        const interval = setInterval(() => {
            Fetchdata();
        }, 900000); // 15 minutes

        return () => clearInterval(interval);
    }, [date, obbSheetId, unit]);

    return (
        <div ref={chartRef} style={{ width: chartWidth }}>
            {isSubmitting ? (
                <Loader2 />
            ) : (
                <BarChart width={chartWidth} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="count" position="top" />
                    </Bar>
                </BarChart>
            )}
        </div>
    );
};

export default TableCompo;