import { renderToStream } from "@react-pdf/renderer";

import DayEndLineAllQcReportTemplate from "@/components/templates/report/day-end-line-allqc-report-template";

type ReportDetailsType = {
    label: string;
    value: string;
};

export async function pdfRenderToStream(reportData: any[], reportDetails: ReportDetailsType[], defectsSummary: any[]): Promise<NodeJS.ReadableStream> {
    const pdfStream = await renderToStream(
        <DayEndLineAllQcReportTemplate
            details={reportDetails}
            data={reportData}
            defectsSummary={defectsSummary}
        />
    );

    return pdfStream;
}