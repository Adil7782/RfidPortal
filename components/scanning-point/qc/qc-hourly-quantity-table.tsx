import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import QcHourlyDefectsAnalysisDialogModel from "./qc-hourly-defects-analysis-dialog-model";

const QCHourlyQuantityTable = (
    { hourlyQuantity }: { hourlyQuantity: HourlyQuantityDataTypes[] }
) => {
    return (
        <div className="bg-slate-50 border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-100">
                        <TableHead className="">Hour Group</TableHead>
                        <TableHead className="text-center">Inspect Qty</TableHead>
                        <TableHead className="text-center">Pass Qty</TableHead>
                        <TableHead className="text-center">Rework Qty</TableHead>
                        <TableHead className="text-center">Reject Qty</TableHead>
                        <TableHead className="text-center">DHU</TableHead>
                        <TableHead className="text-center">Analytics</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hourlyQuantity.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.hourGroup}</TableCell>
                            <TableCell className="text-center">{row.inspectQty}</TableCell>
                            <TableCell className="text-center">{row.passQty}</TableCell>
                            <TableCell className="text-center">{row.reworkQty}</TableCell>
                            <TableCell className="text-center">{row.rejectQty}</TableCell>
                            <TableCell className="text-center">{row.DHU.toFixed(1)}%</TableCell>
                            <TableCell className="text-center">
                                <QcHourlyDefectsAnalysisDialogModel 
                                    data={row.defectsAnalysis}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default QCHourlyQuantityTable