import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface QCHoursAndTargetProps {
    qcTarget: number | undefined | null;
    workingHours: number | undefined | null;
}

const QCHoursAndTarget = ({
    qcTarget,
    workingHours
}: QCHoursAndTargetProps) => {
    return (
        <div className={cn("p-4 bg-slate-100 rounded-lg border", !qcTarget && "bg-orange-500/10 border-orange-500/50")}>
            {qcTarget && workingHours ?
                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col gap-x-2 items-center'>
                        Hourly Target:
                        <p className='py-1 bg-slate-300 rounded-md min-w-12 text-lg flex justify-center'>{qcTarget / workingHours}</p>
                    </div>
                    {/* <Badge variant="outline" className='text-sm font-medium px-4'>
                        Hours
                    </Badge> */}
                </div>
                :
                <p className="text-orange-500 flex gap-x-2 items-center">
                    <TriangleAlert className="w-5 h-5"/>
                    Please set the target for this QC section!
                </p>
            }
        </div>
    )
}

export default QCHoursAndTarget