"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import GmtQuantityDetailsDialogModel from './gmt-quantity-details-dialog-model';

type QCQuantityCountDataType = {
    title: string;
    hour: number;
    day: number;
}

interface GmtQCQuantityCountTableProps {
    part: string;
    obbSheetId: string;
    data: QCQuantityCountDataType[];
}

const GmtQCQuantityCountTable = ({
    part,
    obbSheetId,
    data
}: GmtQCQuantityCountTableProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [qcStatus, setQcStatus] = useState<string>('');

    const handleClose = () => {
        setIsOpen(false);
        setQcStatus('');
        router.refresh();
    };

    const handleDetailsDialog = (index: number) => {
        switch (index) {
            case 0:
                setQcStatus('all');
                break;
            case 1:
                setQcStatus('pass');
                break;
            case 2:
                setQcStatus('rework');
                break;
            case 3:
                setQcStatus('reject');
                break;
            default:
                break;
        }

        setIsOpen(true);
    }

    return (
        <div className="grid grid-cols-4 border border-slate-300 rounded-lg">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "px-4 pt-2 pb-3",
                        index === 0 && "rounded-l-lg bg-slate-100",
                        index === 1 && "bg-green-100",
                        index === 2 && "bg-orange-100",
                        index === 3 && "rounded-r-lg bg-red-100",
                        index !== 3 && "border-r border-slate-300",
                    )}
                >
                    <h2 className={cn(
                        "text-center mb-2 text-lg py-1 font-semibold",
                        index === 0 && "text-slate-600",
                        index === 1 && "text-green-600",
                        index === 2 && "text-orange-600",
                        index === 3 && "text-red-600",
                    )}>
                        {item.title}
                    </h2>
                    <div className="flex items-center gap-4">
                        {/* <div className={cn(
                            "text-center w-1/2 py-3 rounded-md border",
                            index === 0 && "bg-slate-200/70",
                            index === 1 && "bg-green-200/90 border-green-600/20",
                            index === 2 && "bg-orange-200/70 border-orange-600/20",
                            index === 3 && "bg-red-200/70 border-red-600/20",
                        )}>
                            <p className="-mt-1 text-sm text-slate-500">Hourly</p>
                            <h1 className={cn(
                                "text-3xl font-bold text-slate-800",
                                index === 1 && "text-green-700",
                                index === 2 && "text-orange-600",
                                index === 3 && "text-red-600",
                            )}>
                                {item.hour}
                            </h1>
                        </div> */}
                        <div 
                            onClick={() => handleDetailsDialog(index)}
                            className={cn(
                                "text-center w-full py-3 rounded-md border cursor-pointer",
                                index === 0 && "bg-slate-200/70 hover:border-slate-300",
                                index === 1 && "bg-green-200/90 border-green-600/20 hover:border-green-600/50",
                                index === 2 && "bg-orange-200/70 border-orange-600/20 hover:border-orange-600/50",
                                index === 3 && "bg-red-200/70 border-red-600/20 hover:border-red-600/50",
                            )}
                        >
                            {/* <p className="-mt-1 text-sm text-slate-500">Today</p> */}
                            <h1 className={cn(
                                "text-3xl font-bold text-slate-800",
                                index === 1 && "text-green-700",
                                index === 2 && "text-orange-600",
                                index === 3 && "text-red-600",
                            )}>
                                {item.day}
                            </h1>
                        </div>
                    </div>
                </div>
            ))}
            {qcStatus && 
                <GmtQuantityDetailsDialogModel 
                    isOpen={isOpen}
                    handleClose={handleClose}
                    part={part}
                    obbSheetId={obbSheetId}
                    qcStatus={qcStatus}
                />
            }
        </div>
    )
}

export default GmtQCQuantityCountTable