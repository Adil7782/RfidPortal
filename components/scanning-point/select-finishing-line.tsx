"use client"

import Link from "next/link";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FINISHING_LINES } from "@/constants";

const SelectFinishingLine = () => {
    return (
        <div className='mt-20 border px-10 pt-8 p-10 rounded-lg bg-slate-100 space-y-2'>
            <h1 className="text-slate-600 font-medium">Select Finishing Line</h1>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select finishing line..." />
                </SelectTrigger>
                <SelectContent>
                    <div className="flex flex-col gap-1">
                        {FINISHING_LINES.map(line => (
                            <Link key={line.id} href={`/points/finishing-line-qc/${line.id}`}>
                                <div className="py-3 px-6 text-lg bg-slate-100 border rounded-md hover:bg-slate-200 transition-colors">
                                    {line.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectFinishingLine;
