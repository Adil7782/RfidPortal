"use client"

import { Defect } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface QCMultiSelectDefectProps {
    defects: Defect[] | undefined;
    selectedDefects: string[];
    handleToggle: (defect: Defect) => void;
}

const QCMultiSelectDefects = ({
    defects,
    selectedDefects,
    handleToggle
}: QCMultiSelectDefectProps) => {
    return (
        <>
        {defects ?
            <ScrollArea className={cn('bg-slate-100 border rounded-lg h-[654px]', selectedDefects.length > 0 && "border-red-500")}>
                <div className='grid grid-cols-4 gap-4 p-4'>
                    {defects && defects.map((defect) => (
                        <div
                            key={defect.id}
                            className={cn(
                                "py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-pointer rounded-sm border transition-all",
                                selectedDefects.includes(defect.id) ? "bg-[#0980D4] text-white border-[#0980D4] hover:opacity-85" : "text-slate-800 bg-[#0980D4]/10 border-[#0980D4]/20 hover:bg-[#0980D4]/20 hover:border-[#0980D4]/50"
                            )}
                            onClick={() => handleToggle(defect)}
                        >
                            {defect.name}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            :
            <div className='bg-slate-100 border p-4 rounded-lg min-h-96 flex justify-center items-center text-slate-500'>
                Please create defetcs fro this QC section
            </div>
        }
        </>
    )
}

export default QCMultiSelectDefects