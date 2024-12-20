import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineNonQcAssemblyReportTemplate from '../day-end-line-nonqc-assembly-report-template';

type HourlyReportType = {
    hourGroup: string;
    totalBundles: number;
    totalGarmentQty: number;
};

type CuttingReportType = {
    cuttingNo: number;
    buyerName: string;
    style: string;
    color: string;
    shade: string;
    InputBundlQty: number;
    InputGarmentQty: number;
};

interface DayEndLineNonQcAssemblyReportViewerProps {
    details: { label: string, value: string }[];
    reportData: any[];
}

const DayEndLineNonQcAssemblyReportViewer = ({ details, reportData }: DayEndLineNonQcAssemblyReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineNonQcAssemblyReportTemplate
                    details={details}
                    reportData={reportData}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineNonQcAssemblyReportViewer;
