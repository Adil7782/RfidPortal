"use client"

import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import ReadingRFIDDialogModel from "@/components/scanning-point/reading-rfid-dialog-model";

interface FinishingLineSectionProps {
    pointNo: number;
}

const FinishingLineSection = ({
    pointNo
}: FinishingLineSectionProps) => {
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (tag: string) => {
        setIsUpdating(true);
        
        const data = {
            pointNo,
            rfidTag: tag,
        }

        await axios.patch('/api/scanning-point/product/update/single', data)
            .then(data => {
                console.log("Successfully updated", data);
                toast({
                    title: "Successfully updated",
                    variant: "success",
                });
            })
            .catch(error => {
                toast({
                    title: error.response.data || "Something went wrong",
                    variant: "error",
                    description: (
                        <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                            <code className="text-slate-800">
                                ERROR: {error.message}
                            </code>
                        </div>
                    ),
                });
            })
            .finally(() => setIsUpdating(false));
    };

    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            {!isUpdating ?
                <ReadingRFIDDialogModel handleRfidTag={handleUpdate} isThisFinishingLine={true}/>
            :
                <div className="mt-64 flex flex-col justify-center items-center gap-2 text-slate-500">
                    <Loader2 className="animate-spin w-12 h-12 text-[#0980D4]"/>
                    Updating...
                </div>
            }
        </section>
    )
}

export default FinishingLineSection