"use client"

import { useState, useEffect } from "react";
import { Defect, ScanningPoint } from "@prisma/client";
import { toast as hotToast } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { fetchQcDefectsForQcPoint } from "@/actions/admin/fetch-qc-defetcs-for-qcpoint";
import { Loader2, Trash2 } from "lucide-react";
import { deleteQcDefect } from "@/actions/admin/delete-qc-defect";

interface ShowQcDefectsProps {
    qcPoints: ScanningPoint[];
}

const ShowQcDefects = ({
    qcPoints
}: ShowQcDefectsProps) => {
    const [selectedQcPointId, setSelectedQcPointId] = useState<string>(qcPoints[0].id);
    const [defects, setDefects] = useState<Defect[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await fetchQcDefectsForQcPoint(selectedQcPointId);
            setDefects(response);
        })();
    }, [selectedQcPointId, isDeleting]);

    return (
        <div className="w-full flex gap-4">
            <div className="md:w-1/3 flex flex-col space-y-2">
                {qcPoints.length > 0 && qcPoints.map((qcPoint) => (
                    <div
                        key={qcPoint.id}
                        className={cn(
                            "bg-white border rounded-md py-3 px-4 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition",
                            selectedQcPointId === qcPoint.id && "border-slate-400 bg-slate-200"
                        )}
                        onClick={() => setSelectedQcPointId(qcPoint.id)}
                    >
                        {qcPoint.name}
                    </div>
                ))}
            </div>
            <div className="md:w-2/3 bg-slate-100 border rounded-md py-3 px-4 overflow-y-auto">
                {selectedQcPointId ?
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-slate-800">QC Defects ({defects.length})</h2>
                        <div className="mt-6">
                            {defects.length === 0 ? (
                                <p className="text-slate-500 text-sm">No Defects found for this QC point.</p>
                            ) : (
                                <ul className="grid grid-cols-3 gap-y-3 gap-x-2">
                                    {defects.map((defect) => (
                                        <li key={defect.id} className="group flex justify-between items-center h-fit gap-3 rounded-full text-white pl-5 pr-2 py-1.5 bg-slate-700/80 hover:bg-slate-700">
                                            {defect.name}
                                            <div
                                                className="opacity-0 group-hover:opacity-100 flex justify-center items-center size-7 bg-red-100/20 rounded-full hover:bg-red-500 cursor-pointer"
                                                onClick={async () => {
                                                    setIsDeleting(true);
                                                    const res = await deleteQcDefect(defect.id);
                                                    hotToast(res);
                                                    setIsDeleting(false);
                                                }}
                                            >
                                                {isDeleting ?
                                                    <Loader2 size={16} className="animate-spin"/>
                                                    :
                                                    <Trash2 size={16} />
                                                }
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    :
                    <div className="w-full h-full flex justify-center items-center text-slate-600">
                        Please select a QC scanning point!
                    </div>
                }
            </div>
        </div>
    )
}

export default ShowQcDefects