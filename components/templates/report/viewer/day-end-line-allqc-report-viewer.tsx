import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineAllQcReportTemplate from '@/components/templates/report/day-end-line-allqc-report-template';

interface DayEndLineAllQcReportViewerProps {
    details: { label: string, value: string }[];
    data: { label: string; data: HourlyQuantityFunctionReturnTypes }[];
    defectsSummary: { label: string; data: { name: string; count: number }[] }[];
    
}

const DayEndLineAllQcReportViewer = ({ details, data ,defectsSummary}: DayEndLineAllQcReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineAllQcReportTemplate
                    details={details}
                    data={data}
                    defectsSummary= {defectsSummary}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineAllQcReportViewer;
