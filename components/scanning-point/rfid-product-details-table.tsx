import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface RfidProductDetailsTableProps {
    productDetails: ProductDataForRFIDType[]
}

const RfidProductDetailsTable = ({
    productDetails
}: RfidProductDetailsTableProps) => {
    return (
        <div className="min-h-[334px] max-h-[540px] w-full overflow-y-auto">
            <Table className="w-full qr-table">
                <TableHeader>
                    <TableRow className="primary-bg">
                        <TableHead className="text-white text-center">No</TableHead>
                        <TableHead className="text-white text-center">RFID</TableHead>
                        <TableHead className="text-white text-center">Style</TableHead>
                        <TableHead className="text-white text-center">Shade</TableHead>
                        <TableHead className="text-white text-center">Color</TableHead>
                        <TableHead className="text-white text-center">Size</TableHead>
                        <TableHead className="text-white text-center">Buyer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productDetails.map((data, idx) => (
                        <TableRow key={data.id}>
                            <TableCell className="font-medium text-center bg-slate-200">{idx + 1}</TableCell>
                            <TableCell className="font-medium text-center">{data.rfid}</TableCell>
                            <TableCell className="text-center">{data.styleNo}</TableCell>
                            <TableCell className="text-center">{data.shade}</TableCell>
                            <TableCell className="text-center">{data.color}</TableCell>
                            <TableCell className="text-center">{data.size}</TableCell>
                            <TableCell className="text-center">{data.buyerName.toUpperCase()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default RfidProductDetailsTable