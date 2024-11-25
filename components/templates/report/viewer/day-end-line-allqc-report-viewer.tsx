import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineAllQcReportTemplate from '@/components/templates/report/day-end-line-allqc-report-template';

interface DayEndLineAllQcReportViewerProps {
    details: { label: string, value: string }[];
    data: { label: string; data: HourlyQuantityFunctionReturnTypes }[];
}

const DayEndLineAllQcReportViewer = ({ details, data }: DayEndLineAllQcReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineAllQcReportTemplate
                    details={details}
                    data={data}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineAllQcReportViewer;
