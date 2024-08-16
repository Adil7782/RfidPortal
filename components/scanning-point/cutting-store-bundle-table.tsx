import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CuttingStoreBundleTableProps {
    bundleData: {
        qrCode: string;
        bundleNo: string;
        color: string;
        cuttingNo: string;
        size: string;
        buyerName: string;
        startPly: string;
        endPly: string;
        patternNo: string | null;
        quantity: string;
    }[]
}

const CuttingStoreBundleTable = ({
    bundleData
}: CuttingStoreBundleTableProps) => {
    return (
        <>
        {bundleData.length > 0 ?
            <div className="min-h-[334px] max-h-[540px] overflow-y-auto">
                <Table className="w-full qr-table">
                    <TableHeader>
                        <TableRow className="primary-bg">
                            <TableHead className="text-white text-center">Bundle Barcode</TableHead>
                            <TableHead className="text-white text-center">Bundle No</TableHead>
                            <TableHead className="text-white w-[120px] text-center">Color</TableHead>
                            <TableHead className="text-white text-center">Cutting No</TableHead>
                            <TableHead className="text-white text-center">Size</TableHead>
                            <TableHead className="text-white text-center">Buyer Name</TableHead>
                            <TableHead className="text-white text-center">StartPly</TableHead>
                            <TableHead className="text-white text-center">EndPly</TableHead>
                            <TableHead className="text-white text-center">Pattern No</TableHead>
                            <TableHead className="text-white text-center">Bundle Qty</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bundleData.map(data => (
                            <TableRow key={data.qrCode}>
                                <TableCell className="font-medium text-center">{data.qrCode}</TableCell>
                                <TableCell className="text-center">{data.bundleNo}</TableCell>
                                <TableCell className="text-center">{data.color}</TableCell>
                                <TableCell className="text-center">{data.cuttingNo}</TableCell>
                                <TableCell className="text-center">{data.size}</TableCell>
                                <TableCell className="text-center">{data.buyerName}</TableCell>
                                <TableCell className="text-center">{data.startPly}</TableCell>
                                <TableCell className="text-center">{data.endPly}</TableCell>
                                <TableCell className="text-center">{data.patternNo}</TableCell>
                                <TableCell className="text-center">{data.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        :
            <div className="h-[172px] bg-slate-100 flex justify-center items-center">
                <p className="text-center text-gray-500">Please scan Bundles</p>
            </div>
        }
        </>
    )
}

export default CuttingStoreBundleTable