"use client"

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchQcDetailsByStatus } from "@/actions/qc/gmt/fetch-qc-details-by-status";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GmtQuantityDetailsDialogModelProps {
    isOpen: boolean;
    handleClose: () => void;
    part: string;
    obbSheetId: string;
    qcStatus: string;
}

const GmtQuantityDetailsDialogModel = ({
    isOpen,
    handleClose,
    part,
    obbSheetId,
    qcStatus,
}: GmtQuantityDetailsDialogModelProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState<GmtQcDetailsType[]>([]);

    const fetchTableData = async () => {
        setIsLoading(true);
        const response = await fetchQcDetailsByStatus(part, obbSheetId, qcStatus);
        console.log("RES", response);
        setTableData(response);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTableData();
    }, [part, obbSheetId, qcStatus]);

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-md:py-8 md:p-8 min-w-[70vw]">
                <DialogHeader className="">
                    <DialogTitle className="flex items-center justify-between">
                        Garment Qantity Details for {qcStatus}
                        <Badge className="text-lg rounded-lg px-4">{tableData.length}</Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="max-h-[72vh] overflow-y-auto">
                    {isLoading ?
                        <div className="flex justify-center items-center h-40 bg-slate-100 border rounded-lg">
                            <Loader2 className="animate-spin w-8 h-8 text-slate-500" />
                        </div>
                        :
                        <>
                            {tableData.length > 0 ?
                                <Table className="w-full qr-table">
                                    <TableHeader>
                                        <TableRow className="primary-bg hover:bg-slate-700">
                                            <TableHead className="text-white text-center">Barcode</TableHead>
                                            <TableHead className="text-white text-center">Color</TableHead>
                                            <TableHead className="text-white text-center">Shade</TableHead>
                                            <TableHead className="text-white text-center">Size</TableHead>
                                            <TableHead className="text-white text-center">Style No</TableHead>
                                            <TableHead className="text-white text-center">Buyer Name</TableHead>
                                            <TableHead className="text-white text-center">Serial No</TableHead>
                                            {qcStatus === 'all' &&
                                                <TableHead className="text-white text-center">QC Status</TableHead>
                                            }
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.map(data => (
                                            <TableRow key={data.id}>
                                                <TableCell className="font-medium text-center">{data.gmtData.gmtBarcode}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.color}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.shade}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.size}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.styleNo}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.buyerName}</TableCell>
                                                <TableCell className="text-center">{data.gmtData.serialNumber}</TableCell>
                                                {qcStatus === 'all' && 
                                                    <TableCell className={cn("text-center", data.qcStatus === 'pass' ? 'text-green-600 bg-green-100/60' : data.qcStatus === 'rework' ? 'text-orange-600 bg-orange-100/60' : 'text-red-600 bg-red-100/60')}>
                                                        {data.qcStatus}
                                                    </TableCell>
                                                }
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                :
                                <div className="flex justify-center items-center h-40 bg-slate-100 border rounded-lg">
                                    No data found for today
                                </div>
                            }
                        </>
                    }
                </div>

                <DialogFooter>
                    <Button
                        variant='outline'
                        className="flex gap-2 px-6"
                        onClick={() => { handleClose(); setTableData([]); }}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GmtQuantityDetailsDialogModel