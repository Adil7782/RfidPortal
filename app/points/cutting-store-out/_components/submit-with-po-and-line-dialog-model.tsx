"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { toast as hotToast } from 'react-hot-toast';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchProductionLinesForUnit } from "@/actions/from-eliot/fetch-production-lines-for-unit";
import { Loader2, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SubmitWithPoAndLineDialogModelProps {
    unit: string;
    poCodes: string[];
    bundleIds: string[];
}

type UserSelectionDataType = {
    po?: string;
    lineId?: string;
    lineName?: string;
}

const UNIT_DETAILS = [
    "AGL Unit 01",
    "AGL Unit 02",
    "AGL Unit 03",
    "AGL Unit 04",
    "AGL Unit 05"
]

const SubmitWithPoAndLineDialogModel = ({
    unit,
    poCodes,
    bundleIds
}: SubmitWithPoAndLineDialogModelProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [poductionLines, setpoductionLines] = useState<ProductionLineDetailsType[]>([]);
    const [selectedData, setSelectedData] = useState<UserSelectionDataType>({ po: "", lineId: "", lineName: "" });

    const fetchLineData = async () => {
        const lines = await fetchProductionLinesForUnit(unit);
        setpoductionLines(lines);
    }

    useEffect(() => {
        fetchLineData();
    }, [unit]);

    const handleSelectUnit = async (unitName: string) => {
        const lines = await fetchProductionLinesForUnit(unitName);
        if (lines.length > 0) {
            setpoductionLines(lines);
        } else {
            hotToast.error("Production lines are not found for this Unit!");
        }
    }

    const handleUpdate = async () => {
        if (selectedData.po && selectedData.lineId && selectedData.lineName) {
            setIsUpdating(true);
            const data = {
                po: selectedData.po,
                lineId: selectedData.lineId,
                lineName: selectedData.lineName,
                bundleIds: bundleIds
            }

            await axios.put(`/api/scanning-point/bundle-data/update`, data)
                .then((res) => {
                    hotToast.success("Bundle updated successfully!");
                })
                .catch(error => {
                    hotToast.error(error.response.data || "Something went wrong");
                })
                .finally(() => {
                    setIsUpdating(false);
                    window.location.reload();
                });
        } else {
            hotToast.error("Update failed! Please try again.");
            window.location.reload();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-4">
                    <Button className="w-full h-12">Save Bundle</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select PO and Line</DialogTitle>
                    <DialogDescription>
                        If the line is not showing, Please select the Unit and Line.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-end border">
                    <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                        <h2 className="text-lg font-medium w-1/4 pl-4">Select PO</h2>
                        <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                            {poCodes.length > 0 && poCodes.map(po => {
                                if (po) {
                                    return (
                                        <button
                                            key={po}
                                            onClick={() => setSelectedData({ po: po, lineId: selectedData.lineId, lineName: selectedData.lineName })}
                                            className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.po === po && "bg-purple-600 text-white border-transparent hover:bg-purple-600/80")}
                                        >
                                            {po}
                                        </button>
                                    )
                                } else return null;
                            })}
                        </div>
                    </div>
                    <Separator />
                    {poductionLines.length > 0 ?
                        <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                            <h2 className="text-lg font-medium w-1/4 pl-4">Select Line</h2>
                            <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                                {poductionLines.map(line => (
                                    <button
                                        key={line.id}
                                        onClick={() => setSelectedData({ po: selectedData.po, lineId: line.id, lineName: line.name })}
                                        className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.lineId === line.id && "bg-pink-600 text-white border-transparent hover:bg-pink-600/80")}
                                    >
                                        {line.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        :
                        <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                            <h2 className="text-lg font-medium w-1/4 pl-4">Select Unit</h2>
                            <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                                {UNIT_DETAILS.map(unit => (
                                    <button
                                        key={unit}
                                        onClick={() => handleSelectUnit(unit)}
                                        className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.lineId === unit && "bg-pink-600 text-white border-transparent hover:bg-pink-600/80")}
                                    >
                                        {unit}
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <DialogFooter>
                    {(selectedData.po && selectedData.lineId && selectedData.lineName) && (
                        <Button
                            disabled={isUpdating}
                            onClick={handleUpdate}
                            className="flex max-md:w-full gap-2 pr-5 md:w-40"
                            variant="default"
                        >
                            <Zap className={cn("w-5 h-5", isUpdating && "hidden")} />
                            <Loader2 className={cn("animate-spin w-5 h-5 hidden", isUpdating && "flex")} />
                            Save
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitWithPoAndLineDialogModel