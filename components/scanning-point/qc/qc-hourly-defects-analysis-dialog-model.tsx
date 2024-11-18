import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type DefectsAnalysisDataTypes = {
    operationName: string;
    operationCode: string;
    operatorName: string;
    defects: string[];
};

const QcHourlyDefectsAnalysisDialogModel = ({ data }: { data: DefectsAnalysisDataTypes[] | undefined }) => {
    // Preprocess data to group by operator and operation
    const aggregatedData = data
        ? Object.values(
            data.reduce<Record<string, { operatorName: string; operationName: string; defectCount: number; defects: Set<string> }>>(
                (acc, item) => {
                    const key = `${item.operatorName}-${item.operationName}`;
                    if (!acc[key]) {
                        acc[key] = {
                            operatorName: item.operatorName,
                            operationName: item.operationName,
                            defectCount: 0,
                            defects: new Set(),
                        };
                    }
                    acc[key].defectCount += item.defects.length;
                    item.defects.forEach((defect) => acc[key].defects.add(defect));
                    return acc;
                },
                {}
            )
        ).map(({ operatorName, operationName, defectCount, defects }) => ({
            operatorName,
            operationName,
            defectCount,
            defects: Array.from(defects),
        }))
        : [];

    return (
        <Dialog>
            <DialogTrigger>
                <div className="p-1.5 border rounded-md bg-white/40 text-slate-600 hover:text-slate-800 hover:bg-white">
                    <Plus size={20} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hourly Defects Analytics</DialogTitle>
                </DialogHeader>
                <div>
                    <Table className="border">
                        <TableHeader>
                            <TableRow className="bg-slate-100">
                                <TableHead>Operator Name</TableHead>
                                <TableHead className="text-center border-l">Operation Name</TableHead>
                                <TableHead className="text-center border-l">Defect Types</TableHead>
                                <TableHead className="text-center border-l">Defects QTY</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {aggregatedData.map((row, index) => {
                                if (row.defectCount === 0) return null;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{row.operatorName}</TableCell>
                                        <TableCell className="text-center border-l">{row.operationName}</TableCell>
                                        <TableCell className="text-center border-l">
                                            {row.defects.join(", ")}
                                        </TableCell>
                                        <TableCell className="text-center border-l">{row.defectCount}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QcHourlyDefectsAnalysisDialogModel;
