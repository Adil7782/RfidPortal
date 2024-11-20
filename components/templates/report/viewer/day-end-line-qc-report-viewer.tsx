import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineQcReportTemplate from '@/components/templates/report/day-end-line-qc-report-template';

interface DayEndLineQcReportViewerProps {
    details: { label: string, value: string }[];
    data: { label: string; data: HourlyQuantityFunctionReturnTypes }[];
}

const DayEndLineQcReportViewer = ({ details, data }: DayEndLineQcReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineQcReportTemplate
                    details={details}
                    data={data}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineQcReportViewer;
