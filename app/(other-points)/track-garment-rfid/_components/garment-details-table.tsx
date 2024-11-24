import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Product, ProductDefect } from "@prisma/client";

interface GarmentDetailsTableProps {
    product: Product;
    qc: ProductDefect[];
}

const GarmentDetailsTable = ({
    product,
    qc,
}: GarmentDetailsTableProps) => {
    const getTimestamp = (part: string) => {
        const filteredQc = qc.filter(qc => qc.part === part);
        return filteredQc.length > 0 ? filteredQc[0].timestamp : "-";
    };

    const getQcStatus = (part: string) => {
        const filteredQc = qc.filter(qc => qc.part === part);
        return filteredQc.length > 0 ? filteredQc[0].qcStatus : "-";
    };

    const getOperatorName = (part: string) => {
        const filteredQc = qc.filter(qc => qc.part === part);
        return filteredQc.length > 0 ? filteredQc[0].operatorName : "-";
    };

    return (
        <Table className="w-full qr-table">
            <TableHeader>
                <TableRow className="bg-slate-800 hover:bg-slate-700">
                    <TableHead className="text-white text-center"></TableHead>
                    <TableHead className="text-white text-center">Assemble</TableHead>
                    <TableHead className="text-white text-center">Assembly QC</TableHead>
                    <TableHead className="text-white text-center">End QC</TableHead>
                    <TableHead className="text-white text-center">Button QC</TableHead>
                    <TableHead className="text-white text-center">Button OUT</TableHead>
                    <TableHead className="text-white text-center">Wash IN</TableHead>
                    <TableHead className="text-white text-center">Dry QC</TableHead>
                    <TableHead className="text-white text-center">Wet QC</TableHead>
                    <TableHead className="text-white text-center">Wash OUT</TableHead>
                    <TableHead className="text-white text-center">Finish IN</TableHead>
                    <TableHead className="text-white text-center">Finish Line IN</TableHead>
                    <TableHead className="text-white text-center">Finish Line QC</TableHead>
                    <TableHead className="text-white text-center">Finish OUT</TableHead>
                    <TableHead className="text-white text-center">Pack IN</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium text-left">Timestamp</TableCell>
                    <TableCell className="text-center">{product.timestampAssembled}</TableCell>
                    <TableCell className="text-center">{product.timestampAssembleQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampEndQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampButtonQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampButtonOut ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampWashIn ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampDryQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampWetQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampWashOut ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampFinishIn ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampFinishLineIn ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampFinishLineQc ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampFinishOut ?? "-"}</TableCell>
                    <TableCell className="text-center">{product.timestampPackIn ?? "-"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-left">QC Status</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getQcStatus("assembly")}</TableCell>
                    <TableCell className="text-center">{getQcStatus("line-end")}</TableCell>
                    <TableCell className="text-center">{getQcStatus("button")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getQcStatus("dry")}</TableCell>
                    <TableCell className="text-center">{getQcStatus("wet")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getQcStatus("finish-line")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-left">QC Timestamp</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getTimestamp("assembly")}</TableCell>
                    <TableCell className="text-center">{getTimestamp("line-end")}</TableCell>
                    <TableCell className="text-center">{getTimestamp("button")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getTimestamp("dry")}</TableCell>
                    <TableCell className="text-center">{getTimestamp("wet")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getTimestamp("finish-line")}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-left">Operator Name</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getOperatorName("assembly") ?? "-"}</TableCell>
                    <TableCell className="text-center">{getOperatorName("line-end") ?? "-"}</TableCell>
                    <TableCell className="text-center">{getOperatorName("button") ?? "-"}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getOperatorName("dry") ?? "-"}</TableCell>
                    <TableCell className="text-center">{getOperatorName("wet") ?? "-"}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{getOperatorName("finish-line") ?? "-"}</TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default GarmentDetailsTable