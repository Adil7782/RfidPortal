import { 
    Barcode, 
    Blend, 
    Hash, 
    PaintBucket, 
    Palette, 
    Ruler, 
    Shirt, 
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

interface GmtDataPreviewTableProps {
    gmtBarcode: string | undefined,
    color: string | undefined,
    shade: string | undefined,
    size: string | undefined,
    styleNo: string | undefined,
    buyerName: string | undefined,
    partName: string | undefined,
    serialNumber: number | undefined
}

const GmtDataPreviewTable = ({
    gmtBarcode,
    color,
    shade,
    size,
    styleNo,
    buyerName,
    partName,
    serialNumber
}: GmtDataPreviewTableProps) => {
    return (
        <div className={cn("mt-2", gmtBarcode && "border shadow-sm")}>
            {gmtBarcode ?
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
                                GMT Barcode
                            </TableCell>
                            <TableCell className="">{gmtBarcode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Shirt className="w-5 h-5 text-slate-500 opacity-80" />
                                Part Name
                            </TableCell>
                            <TableCell className="">{partName}</TableCell>
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
                                <Blend className="w-5 h-5 text-slate-500 opacity-80" />
                                Shade
                            </TableCell>
                            <TableCell className="">{shade}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium pl-4 flex items-center gap-3">
                                <Hash className="w-5 h-5 text-slate-500 opacity-80" />
                                Serial Number
                            </TableCell>
                            <TableCell className="">{serialNumber}</TableCell>
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
                                <Palette className="w-5 h-5 text-slate-500 opacity-80" />
                                Style No
                            </TableCell>
                            <TableCell className="">{styleNo}</TableCell>
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

export default GmtDataPreviewTable