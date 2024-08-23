import {
    Barcode,
    Boxes,
    Hash,
    ListOrdered,
    PaintBucket,
    Ruler,
    ScissorsLineDashed,
    ShoppingBag,
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

interface BundleDataPreviewTableProps {
    bundleBarcode: string | number | undefined,
    bundleNo: string | number | undefined,
    color: string | undefined,
    quantity: string | number | undefined,
    startPly: string | number | undefined,
    endPly: string | number | undefined,
    cuttingNo: string | number | undefined,
    size: string | undefined,
    buyerName: string | undefined,
    patternNo: string | undefined,
    po?: { poCode: string }[],
    poFromDB?: string[],
}

const BundleDataPreviewTable = ({
    bundleBarcode,
    bundleNo,
    color,
    quantity,
    startPly,
    endPly,
    cuttingNo,
    size,
    buyerName,
    patternNo,
    po,
    poFromDB
}: BundleDataPreviewTableProps) => {
    return (
        <div className={cn("mt-2", bundleBarcode && "border shadow-sm")}>
            {bundleBarcode ?
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
                                <Ruler className="w-5 h-5 text-slate-500 opacity-80" />
                                Size
                            </TableCell>
                            <TableCell className="">{size}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Boxes className="w-5 h-5 text-slate-500 opacity-80" />
                                Quantity
                            </TableCell>
                            <TableCell className="">{quantity} ({startPly} - {endPly})</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <ListOrdered className="w-5 h-5 text-slate-500 opacity-80" />
                                Pattern Number
                            </TableCell>
                            <TableCell className="">{patternNo}</TableCell>
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
                                <ShoppingBag className="w-5 h-5 text-slate-500 opacity-80" />
                                PO Codes
                            </TableCell>
                            <TableCell className="">
                                <div className="flex flex-wrap gap-1">
                                    {po ?
                                        <>
                                            {po.length > 0 && po.map(poCode => (
                                                <p key={poCode.poCode} className="bg-slate-100 w-fit px-1">{poCode.poCode}</p>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {poFromDB && poFromDB.map(poCode => (
                                                <p key={poCode} className="bg-slate-100 w-fit px-1">{poCode}</p>
                                            ))}
                                        </>
                                    }
                                </div>
                            </TableCell>
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