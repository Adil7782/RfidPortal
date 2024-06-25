import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface QCSectionTargetTableProps {
    id: string;
    dailyTarget: number,
    workingHours: number,
    userEmail: string,
    qcSection: {
        name: string
    }
}

const QCSectionTargetTable = ({
    qcSectionTargets 
}: { qcSectionTargets: QCSectionTargetTableProps[] }) => {
    return (
        <Table className="border">
            <TableHeader>
                <TableRow className="bg-slate-100">
                    <TableHead className="">QC Section</TableHead>
                    <TableHead className="text-center">Target</TableHead>
                    <TableHead className="text-center">Working Hours</TableHead>
                    <TableHead className="text-right">Created by</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {qcSectionTargets.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{row.qcSection.name}</TableCell>
                        <TableCell className="text-center">{row.dailyTarget}</TableCell>
                        <TableCell className="text-center">{row.workingHours}</TableCell>
                        <TableCell className="text-right text-slate-600">{row.userEmail}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default QCSectionTargetTable