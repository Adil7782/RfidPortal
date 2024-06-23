import { QcSectionTarget } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface QCHoursAndTargetProps {
    qcTarget: QcSectionTarget | null
}

const QCHoursAndTarget = ({
    qcTarget
}: QCHoursAndTargetProps) => {
    return (
        <div className={cn("p-4 bg-slate-100 rounded-lg border", !qcTarget && "bg-orange-500/10 border-orange-500/50")}>
            {qcTarget ?
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex gap-x-2 items-center'>
                        Hourly Target:
                        <p className='py-1 bg-slate-300 rounded-md min-w-12 text-lg flex justify-center'>{qcTarget?.dailyTarget / qcTarget?.workingHours}</p>
                    </div>
                    <Badge variant="outline" className='text-sm font-medium px-4'>
                        {qcTarget?.workingHours} Hours
                    </Badge>
                </div>
                :
                <p className="text-orange-500 flex gap-x-2 items-center">
                    <TriangleAlert className="w-5 h-5"/>
                    Please set the target today!
                </p>
            }
        </div>
    )
}

export default QCHoursAndTarget