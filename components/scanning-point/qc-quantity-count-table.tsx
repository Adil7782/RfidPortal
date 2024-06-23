import { cn } from '@/lib/utils';

type QCQuantityCountDataType = {
    title: string;
    hour: number;
    day: number;
}

interface QCQuantityCountTableProps {
    data: QCQuantityCountDataType[];
}

const QCQuantityCountTable = ({
    data
}: QCQuantityCountTableProps) => {
    return (
        <div className="grid grid-cols-4 border border-slate-300 rounded-lg">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "p-3",
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
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "text-center w-1/2 py-3 rounded-md border",
                            index === 0 && "bg-slate-200/70",
                            index === 1 && "bg-green-200/90 border-green-600/20",
                            index === 2 && "bg-orange-200/70 border-orange-600/20",
                            index === 3 && "bg-red-200/70 border-red-600/20",
                        )}>
                            <p className="text-sm text-slate-500">Hour</p>
                            <h1 className={cn(
                                "text-2xl font-bold text-slate-800",
                                index === 1 && "text-green-700",
                                index === 2 && "text-orange-600",
                                index === 3 && "text-red-600",
                            )}>
                                {item.hour}
                            </h1>
                        </div>
                        <div className={cn(
                            "text-center w-1/2 py-3 rounded-md border",
                            index === 0 && "bg-slate-200/70",
                            index === 1 && "bg-green-200/90 border-green-600/20",
                            index === 2 && "bg-orange-200/70 border-orange-600/20",
                            index === 3 && "bg-red-200/70 border-red-600/20",
                        )}>
                            <p className="text-sm text-slate-500">Day</p>
                            <h1 className={cn(
                                "text-2xl font-bold text-slate-800",
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
        </div>
    )
}

export default QCQuantityCountTable