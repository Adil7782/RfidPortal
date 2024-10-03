import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type BundleDataType = {
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
}

interface CuttingStoreBundleTableProps {
    bundleData?: BundleDataType[];
    bundleData2?: SchemaBundleDataType[];
}

const CuttingStoreBundleTable = ({
    bundleData,
    bundleData2,
}: CuttingStoreBundleTableProps) => {
    return (
        <>
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
                        {bundleData2 ?
                            <>
                                {bundleData2.map(data => (
                                    <TableRow key={data.bundleNo}>
                                        <TableCell className="font-medium text-center">{data.bundleBarcode}</TableCell>
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
                            </>
                            :
                            <>
                                {bundleData && bundleData.map(data => (
                                    <TableRow key={data.bundleNo}>
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
                            </>
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default CuttingStoreBundleTable