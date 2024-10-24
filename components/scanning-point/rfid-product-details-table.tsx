import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface RfidProductDetailsTableProps {
    productDetails: ProductDataForRFIDType[];
    notValidProducts?: BulkGateUpdateResponseType["notValid"];
    alreadyExistProducts?: BulkGateUpdateResponseType["exist"];
}

const RfidProductDetailsTable = ({
    productDetails,
    notValidProducts,
    alreadyExistProducts,
}: RfidProductDetailsTableProps) => {
    // Combine both notValid and alreadyExist into a new list
    const invalidAndExistingProducts = [
        ...(notValidProducts?.data || []),
        ...(alreadyExistProducts?.data || []),
    ];

    const getBackgroundColor = (rfid: string) => {
        if (notValidProducts?.data.some(product => product.rfid === rfid)) {
            return "bg-red-200"; // Red background for notValid products
        } else if (alreadyExistProducts?.data.some(product => product.rfid === rfid)) {
            return "bg-orange-200"; // Orange background for alreadyExist products
        }
        return ""; // Default background for other products
    };

    const getCurrentPointNo = (rfid: string) => {
        const product = notValidProducts?.data.find(product => product.rfid === rfid);
        return product ? product.currentPointNo : "-"; // Return currentPointNo if exists, else "-"
    };

    return (
        <>
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
                            <TableHead className="text-white text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invalidAndExistingProducts.length > 0 ? (
                            productDetails
                                .filter(data => invalidAndExistingProducts.some(p => p.rfid === data.rfid)) // Only show notValid and exist products
                                .map((data, idx) => (
                                    <TableRow key={data.id} className={getBackgroundColor(data.rfid)}>
                                        <TableCell className="font-medium text-center bg-slate-200">{idx + 1}</TableCell>
                                        <TableCell className="font-medium text-center">{data.rfid}</TableCell>
                                        <TableCell className="text-center">{data.styleNo}</TableCell>
                                        <TableCell className="text-center">{data.shade}</TableCell>
                                        <TableCell className="text-center">{data.color}</TableCell>
                                        <TableCell className="text-center">{data.size}</TableCell>
                                        <TableCell className="text-center">{data.buyerName.toUpperCase()}</TableCell>
                                        <TableCell className="text-center">{getCurrentPointNo(data.rfid)}</TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            productDetails.map((data, idx) => (
                                <TableRow key={data.id}>
                                    <TableCell className="font-medium text-center bg-slate-200">{idx + 1}</TableCell>
                                    <TableCell className="font-medium text-center">{data.rfid}</TableCell>
                                    <TableCell className="text-center">{data.styleNo}</TableCell>
                                    <TableCell className="text-center">{data.shade}</TableCell>
                                    <TableCell className="text-center">{data.color}</TableCell>
                                    <TableCell className="text-center">{data.size}</TableCell>
                                    <TableCell className="text-center">{data.buyerName.toUpperCase()}</TableCell>
                                    <TableCell className="text-center">-</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Legend Indicator */}
            {invalidAndExistingProducts.length > 0 &&
                <div className="mt-6 flex gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-orange-200 border border-orange-400" />
                        <span>Already Updated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-red-200 border border-red-400" />
                        <span>Not Passed Previous Point</span>
                    </div>
                </div>
            }
        </>
    )
}

export default RfidProductDetailsTable