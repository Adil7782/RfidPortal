import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineAllQcReportTemplate from '@/components/templates/report/day-end-line-allqc-report-template';
import { defData } from '@/app/admin/reports/day-end/_components/actions';

interface DayEndLineAllQcReportViewerProps {
    details: { label: string, value: string }[];
    data: { label: string; data: HourlyQuantityFunctionReturnTypes }[];
    tableData:{part:string; data:defData}[]
    
}

const DayEndLineAllQcReportViewer = ({ details, data ,tableData}: DayEndLineAllQcReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineAllQcReportTemplate
                    details={details}
                    data={data}
                    tableData= {tableData}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineAllQcReportViewer;
