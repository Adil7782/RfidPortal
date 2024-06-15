import { 
    Barcode, 
    Boxes, 
    CalendarDays, 
    Hash, 
    ListOrdered, 
    PaintBucket, 
    Ruler, 
    ScissorsLineDashed, 
    UsersRound 
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import NoDataFound from "@/components/scanning-point/no-data-found";
import { cn } from "@/lib/utils";

const previewData: SchemaBundleDataType = {
    id: "lxgk79d3-8bHmSMCUK8B2",
    bundleBarcode: 23123,
    bundleNo: 37,
    buyerName: "All Buyer",
    color: "DUSTY OLIVE",
    cuttingDate: "2024-06-08",
    cuttingNo: 1,
    endPly: 645,
    quantity: 15,
    size: "29(A)",
    startPly: 631,
    storeInTimestamp: "2024-06-16 01:47:32",
    storeOutTimestamp: null,
    userEmail: "vinojan02abhimanyu@gmail.com"
}

interface BundleDataPreviewTableProps {
    bundleBarcode: string | number | undefined,
    bundleNo: string | number | undefined,
    color: string | undefined,
    quantity: string | number | undefined,
    startPly: string | number | undefined,
    endPly: string | number | undefined,
    cuttingNo: string | number | undefined,
    cuttingDate: string | undefined,
    size: string | undefined,
    buyerName: string | undefined,
}

const BundleDataPreviewTable = ({
    bundleBarcode,
    bundleNo,
    color,
    quantity,
    startPly,
    endPly,
    cuttingNo,
    cuttingDate,
    size,
    buyerName
}: BundleDataPreviewTableProps) => {
    return (
        <div className={cn("mt-2", previewData && "border shadow-sm")}>
            {previewData ?
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-100">
                            <TableHead className="pl-8 w-1/2">Description</TableHead>
                            <TableHead className="">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Barcode className="w-5 h-5 text-slate-500 opacity-80" />
                                Bundle Barcode
                            </TableCell>
                            <TableCell className="">{bundleBarcode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Hash className="w-5 h-5 text-slate-500 opacity-80" />
                                Bundle Number
                            </TableCell>
                            <TableCell className="">{bundleNo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <PaintBucket className="w-5 h-5 text-slate-500 opacity-80" />
                                Color
                            </TableCell>
                            <TableCell className="">{color}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Boxes className="w-5 h-5 text-slate-500 opacity-80" />
                                Quantity
                            </TableCell>
                            <TableCell className="">{quantity}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <ListOrdered className="w-5 h-5 text-slate-500 opacity-80" />
                                Ply
                            </TableCell>
                            <TableCell className="">{startPly} - {endPly}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <ScissorsLineDashed className="w-5 h-5 text-slate-500 opacity-80" />
                                Cutting Number
                            </TableCell>
                            <TableCell className="">{cuttingNo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <CalendarDays className="w-5 h-5 text-slate-500 opacity-80" />
                                Cutting Date
                            </TableCell>
                            <TableCell className="">{cuttingDate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Ruler className="w-5 h-5 text-slate-500 opacity-80" />
                                Size
                            </TableCell>
                            <TableCell className="">{size}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <UsersRound className="w-5 h-5 text-slate-500 opacity-80" />
                                Buyer Name
                            </TableCell>
                            <TableCell className="">{buyerName}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            :
                <NoDataFound />
            }
        </div>
    )
}

export default BundleDataPreviewTable