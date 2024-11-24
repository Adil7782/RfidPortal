"use client"

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';
import { fetchObbSheetDetails } from '@/actions/from-eliot/fetch-obb-sheet-details';
import SelectObbQcPointDate from './common/select-obb-qcpoint-date';
import { fetchGarmentDefectsWithOperations } from '@/actions/qc/gmt/fetch-garment-defects-with-operations';
import { fetchProductDefectsWithOperations } from '@/actions/qc/product/fetch-product-defects-with-operations';
import { calculateDhuAndAnalyzeDefects2 as gmtCalculationFunction } from '@/actions/qc/gmt/calculate-dhu-and-analyze-defects2';
import { calculateDhuAndAnalyzeDefects2 as productCalculationFunction } from '@/actions/qc/product/calculate-dhu-and-analyze-defects2';
import DayEndLineQcReportTemplate from '@/components/templates/report/day-end-line-qc-report-template';
import DayEndLineQcReportViewer from '@/components/templates/report/viewer/day-end-line-qc-report-viewer';

interface DayEndLineQcReportProps {
    scanningPoints: {
        id: string;
        name: string;
        pointNo: number;
    }[] | null;
    userName: string;
}

type ReportDetailsType = {
    label: string;
    value: string;
};

const DayEndLineQcReport = ({
    scanningPoints,
    userName
}: DayEndLineQcReportProps) => {
    const [pdfLink, setPdfLink] = useState<JSX.Element | null>(null);
    const [reportData, setReportData] = useState<HourlyQuantityFunctionReturnTypes2>();
    const [reportDetails, setReportDetails] = useState<ReportDetailsType[]>([]);


    const handleGenerateReport = async (data: { obbSheetId: string; scanningPointId: string; pointNo: number; date: Date }) => {
        data.date.setDate(data.date.getDate() + 1);
        const formattedDate = data.date.toISOString().split('T')[0];

        const obbRes = await fetchObbSheetDetails(data.obbSheetId);
        
        if (obbRes) {
            if (data.pointNo === 5 || data.pointNo === 6) {
                await generateReportForGmtQc(data.scanningPointId, obbRes, formattedDate);

            }
            else if (data.pointNo === 8 || data.pointNo === 9) {
                await generateReportForProductQc(data.scanningPointId, obbRes, formattedDate);
            }
        }
    };

    const generateReportForProductQc = async (scanningPointId: string, obbSheet: ObbSheetDetailsType, date: string) => {
        const productDefects = await fetchProductDefectsWithOperations({ qcPointId: scanningPointId, date });
        const results = productCalculationFunction(productDefects);
        setReportData(results);

        const reportDetails = [
            { label: "Factory Name", value: "Apparel Gallery LTD" },
            { label: "Scanning Point", value: scanningPoints?.find(p => p.id === scanningPointId)?.name || '' },
            { label: "Date", value: date },
            { label: "Generated By", value: userName },
            { label: "Style", value: obbSheet.style },
            { label: "Buyer", value: obbSheet.buyer },
            { label: "Color", value: obbSheet.color || "-" },
            { label: "Unit", value: obbSheet.unitName },
            { label: "Line", value: obbSheet.lineName },
            // { label: "Total DHU", value: results.totalDHU.toFixed(2) },
        ];
        setReportDetails(reportDetails);

        const pdfElement = generatePdfReport(results, reportDetails);
        setPdfLink(pdfElement);
    }

    const generateReportForGmtQc = async (scanningPointId: string, obbSheet: ObbSheetDetailsType, date: string) => {
        const garmentDefects = await fetchGarmentDefectsWithOperations({ qcPointId: scanningPointId, date });
        const results = gmtCalculationFunction(garmentDefects);
        setReportData(results);

        const reportDetails = [
            { label: "Factory Name", value: "Apparel Gallery LTD" },
            { label: "Scanning Point", value: scanningPoints?.find(p => p.id === scanningPointId)?.name || '' },
            { label: "Date", value: date },
            { label: "Generated By", value: userName },
            { label: "Style", value: obbSheet.style },
            { label: "Buyer", value: obbSheet.buyer },
            { label: "Color", value: obbSheet.color || "-" },
            { label: "Unit", value: obbSheet.unitName },
            { label: "Line", value: obbSheet.lineName },
            // { label: "Total DHU", value: results.totalDHU.toFixed(2) },
        ];
        setReportDetails(reportDetails);

        const pdfElement = generatePdfReport(results, reportDetails);
        setPdfLink(pdfElement);
    }

    const generatePdfReport = (reportData: any, reportDetails: ReportDetailsType[]) => {
        return (
            <PDFDownloadLink
                document={
                    <DayEndLineQcReportTemplate
                        details={reportDetails}
                        data={reportData}
                    />
                }
                fileName="day-end-line-qc-report.pdf"
            >
                {/* {({ loading }) => (loading ? "Generating PDF..." : "Download PDF Report")} */}
                Download PDF Report
            </PDFDownloadLink>
        );
    };

    return (
        <div className="mt-8 mx-auto max-w-7xl">
            <SelectObbQcPointDate
                scanningPoints={scanningPoints}
                handleSubmit={handleGenerateReport}
            />
            {(reportData && reportDetails.length > 0) &&
                <div className='mt-8 p-8 bg-slate-100 rounded-lg border flex flex-col items-end gap-4'>
                    <div className='space-x-4'>
                        {pdfLink && (
                            <Button variant="default">
                                {pdfLink}
                            </Button>
                        )}
                    </div>
                    <div className='w-full pdf-viewer'>
                        <DayEndLineQcReportViewer
                            details={reportDetails}
                            data={reportData}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default DayEndLineQcReport