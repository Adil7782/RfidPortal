import { PDFViewer } from '@react-pdf/renderer';

import DayEndLineNonQcBundleReportTemplate from '@/components/templates/report/day-end-line-nonqc-bundle-report-template';

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

interface DayEndLineNonQcBundleReportViewerProps {
    details: { label: string, value: string }[];
    reportDataByHour: HourlyReportType[];
    reportDataByCuttingNo: CuttingReportType[];
}

const DayEndLineNonQcBundleReportViewer = ({ details, reportDataByHour, reportDataByCuttingNo }: DayEndLineNonQcBundleReportViewerProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <PDFViewer width="100%" height="100%">
                <DayEndLineNonQcBundleReportTemplate
                    details={details}
                    reportDataByHour={reportDataByHour}
                    reportDataByCuttingNo={reportDataByCuttingNo}
                />
            </PDFViewer>
        </div>
    );
}

export default DayEndLineNonQcBundleReportViewer;
