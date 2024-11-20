import { PDFViewer } from '@react-pdf/renderer';

import HourlyQuantityReportTemplate from '@/components/templates/report/hourly-quantity-report-template';

interface HourlyQuantityReportViewerProps {
    details: { label: string, value: string }[];
    data: HourlyQuantityFunctionReturnTypes["hourlyQuantity"]; 
    totalDefectCounts: StatusCountTypes;
}

const HourlyQuantityReportViewer = ({ details, data, totalDefectCounts }: HourlyQuantityReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <HourlyQuantityReportTemplate
                    details={details}
                    data={data}
                    totalDefectCounts={totalDefectCounts}
                />
            </PDFViewer>
        </div>
    );
}

export default HourlyQuantityReportViewer;
