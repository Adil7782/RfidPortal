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

const QcHourlyDefectsAnalysisDialogModel = ({ data }: { data: DefectsAnalysisDataTypes[] | undefined }) => {
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
                                <TableHead className="">Operation Name</TableHead>
                                <TableHead className="text-center border-l">Operation Code</TableHead>
                                <TableHead className="text-center border-l">Operator Name</TableHead>
                                <TableHead className="text-center border-l">Defects</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.map((row, index) => {
                                if (row.defects.length === 0) return null;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{row.operationName}</TableCell>
                                        <TableCell className="text-center border-l">{row.operationCode}</TableCell>
                                        <TableCell className="text-center border-l">{row.operatorName}</TableCell>
                                        <TableCell className="text-center border-l">{row.defects}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QcHourlyDefectsAnalysisDialogModel