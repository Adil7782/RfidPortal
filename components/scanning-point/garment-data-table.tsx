import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { GmtData } from "@prisma/client";

interface GarmentDataTableProps {
    gmtData: GmtData[]
}

const GarmentDataTable = ({
    gmtData
}: GarmentDataTableProps) => {
    return (
        <>
        {gmtData.length > 0 ?
            <div className="min-h-[334px] max-h-[540px] overflow-y-auto">
                <Table className="w-full qr-table">
                    <TableHeader>
                        <TableRow className="primary-bg">
                            <TableHead className="text-white text-center">GMT Barcode</TableHead>
                            <TableHead className="text-white text-center">Color</TableHead>
                            <TableHead className="text-white text-center">Shade</TableHead>
                            <TableHead className="text-white text-center">Size</TableHead>
                            <TableHead className="text-white text-center">Style No</TableHead>
                            <TableHead className="text-white text-center">Buyer Name</TableHead>
                            <TableHead className="text-white text-center">Part Name</TableHead>
                            <TableHead className="text-white text-center">Serial No</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {gmtData.map(data => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium text-center">{data.gmtBarcode}</TableCell>
                                <TableCell className="text-center">{data.color}</TableCell>
                                <TableCell className="text-center">{data.shade}</TableCell>
                                <TableCell className="text-center">{data.size}</TableCell>
                                <TableCell className="text-center">{data.styleNo}</TableCell>
                                <TableCell className="text-center">{data.buyerName}</TableCell>
                                <TableCell className="text-center">{data.partName}</TableCell>
                                <TableCell className="text-center">{data.serialNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        :
            <div className="h-[172px] bg-slate-100 flex justify-center items-center">
                <p className="text-center text-gray-500">Please scan garments</p>
            </div>
        }
        </>
    )
}

export default GarmentDataTable