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

// const previewData: BundleDataType = {
//     bundleBarcode: "23124",
//     bundleNo: 38,
//     color: "DUSTY OLIVE",
//     quantity: 20,
//     startPly: 646,
//     endPly: 665,
//     cuttingNo: 1,
//     cuttingDate: "2024-06-08",
//     size: "29(A)",
//     buyerName: "All Buyer",
// }

interface BundleDataPreviewTableProps {
    previewData: BundleDataType[] | null;
}

const BundleDataPreviewTable = ({
    previewData
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
                            <TableCell className="">{previewData[0].bundleBarcode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Hash className="w-5 h-5 text-slate-500 opacity-80" />
                                Bundle Number
                            </TableCell>
                            <TableCell className="">{previewData[0].bundleNo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <PaintBucket className="w-5 h-5 text-slate-500 opacity-80" />
                                Color
                            </TableCell>
                            <TableCell className="">{previewData[0].color}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Boxes className="w-5 h-5 text-slate-500 opacity-80" />
                                Quantity
                            </TableCell>
                            <TableCell className="">{previewData[0].quantity}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <ListOrdered className="w-5 h-5 text-slate-500 opacity-80" />
                                Ply
                            </TableCell>
                            <TableCell className="">{previewData[0].startPly} - {previewData[0].endPly}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <ScissorsLineDashed className="w-5 h-5 text-slate-500 opacity-80" />
                                Cutting Number
                            </TableCell>
                            <TableCell className="">{previewData[0].cuttingNo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <CalendarDays className="w-5 h-5 text-slate-500 opacity-80" />
                                Cutting Date
                            </TableCell>
                            <TableCell className="">{previewData[0].cuttingDate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Ruler className="w-5 h-5 text-slate-500 opacity-80" />
                                Size
                            </TableCell>
                            <TableCell className="">{previewData[0].size}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <UsersRound className="w-5 h-5 text-slate-500 opacity-80" />
                                Buyer Name
                            </TableCell>
                            <TableCell className="">{previewData[0].buyerName}</TableCell>
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