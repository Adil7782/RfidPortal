import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { GmtData, Product, Rfid } from "@prisma/client";

interface ProductDetailsTableProps {
    data: (Product & {
        frontGmt: GmtData;
        rfid: Rfid;
    })[];
}

const ProductDetailsTable = ({
    data
}: ProductDetailsTableProps) => {
    return (
        <>
        {data.length > 0 ?
            <div className="min-h-[334px] max-h-[540px] overflow-y-auto">
                <Table className="w-full qr-table">
                    <TableHeader>
                        <TableRow className="bg-slate-600 hover:bg-slate-500">
                            <TableHead className="text-white text-center">No</TableHead>
                            <TableHead className="text-white text-center">RFID</TableHead>
                            <TableHead className="text-white text-center">Color</TableHead>
                            <TableHead className="text-white text-center">Shade</TableHead>
                            <TableHead className="text-white text-center">Size</TableHead>
                            <TableHead className="text-white text-center">Style</TableHead>
                            <TableHead className="text-white text-center">Buyer</TableHead>
                            <TableHead className="text-white text-center">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((data, idx) => (
                            <TableRow key={data.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center">{data.rfid.rfid}</TableCell>
                                <TableCell className="text-center">{data.frontGmt.color}</TableCell>
                                <TableCell className="text-center">{data.frontGmt.shade}</TableCell>
                                <TableCell className="text-center">{data.frontGmt.size}</TableCell>
                                <TableCell className="text-center">{data.frontGmt.styleNo}</TableCell>
                                <TableCell className="text-center">{data.frontGmt.buyerName}</TableCell>
                                <TableCell className="text-center">{data.timestampAssembled?.split(" ")[1]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        :
            <div className="h-[172px] bg-slate-100 flex justify-center items-center">
                <p className="text-center text-lg text-gray-500">Assembled garments not found today!</p>
            </div>
        }
        </>
    )
}

export default ProductDetailsTable