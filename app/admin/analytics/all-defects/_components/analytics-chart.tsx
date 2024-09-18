"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseISO, getHours } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";



import SelectScanningPointAndDate from "./select-scanning-point-and-date";

import BarChartGraphDefects from "./all-defect-chart";

interface AnalyticsChartProps {
    title: string;
}

export type SMVChartData = {
    count: number;
    name: string;
};

const AnalyticsChart = ({
    title
}: AnalyticsChartProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [barchartData, setBarchartData] = useState<SMVChartData[]>([]);
    const [obbSheetId, setObbSheetId] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [partArea, setPartArea] = useState<string>("");

    const handleFetchSmv = async (data: { obbSheetId: string; date: Date;part:string }) => {
        try {
            data.date.setDate(data.date.getDate() + 1);
            const formattedDate = data.date.toISOString().split('T')[0];
            setDate(formattedDate);
            setObbSheetId(data.obbSheetId);
            setPartArea(data.part);

            console.log(data)
        } catch (error: any) {
            console.error("Error fetching production data:", error);
            toast({
                title: "Something went wrong! Try again",
                variant: "error"
            });
        }
    };

    return (
        <>
            <div className="mx-auto max-w-7xl">
                <SelectScanningPointAndDate handleSubmit={handleFetchSmv} />
            </div>

            {obbSheetId.length > 0 ? (
                <div className="mx-auto max-w-[1680px] mt-12">
                    <BarChartGraphDefects 
                        obbSheetId={obbSheetId}
                        date={date}
                        partArea={partArea}
                    />
                </div>
            ) : (
                <div className="mt-12 w-full">
                    <p className="text-center text-slate-500">
                        Please select the OBB sheet, operation, and date ☝️
                    </p>
                </div>
            )}
        </>
    );
};

export default AnalyticsChart;
