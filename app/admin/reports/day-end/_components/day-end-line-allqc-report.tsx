"use client"

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';
import { fetchObbSheetDetails } from '@/actions/from-eliot/fetch-obb-sheet-details';
import { fetchGarmentDefectsWithOperations } from '@/actions/qc/gmt/fetch-garment-defects-with-operations';
import { fetchProductDefectsWithOperations } from '@/actions/qc/product/fetch-product-defects-with-operations';
import { calculateDhuAndAnalyzeDefects as gmtCalculationFunction } from '@/actions/qc/gmt/calculate-dhu-and-analyze-defects';
import { calculateDhuAndAnalyzeDefects as productCalculationFunction } from '@/actions/qc/product/calculate-dhu-and-analyze-defects';
import SelectObbSheetAndDate from '@/components/forms/select-obb-sheet-and-date';
import DayEndLineAllQcReportTemplate from '@/components/templates/report/day-end-line-allqc-report-template';
import DayEndLineAllQcReportViewer from '@/components/templates/report/viewer/day-end-line-allqc-report-viewer';
import {  defData, getGmtDefect, getProdDefect } from './actions';

interface DayEndLineAllQcReportProps {
    userName: string;
}

type ReportDetailsType = {
    label: string;
    value: string;
};
type mew = {
    part:string; data:defData
};

const DayEndLineAllQcReport = ({
    userName
}: DayEndLineAllQcReportProps) => {
    const [pdfLink, setPdfLink] = useState<JSX.Element | null>(null);
    const [reportData, setReportData] = useState<{ label: string; data: HourlyQuantityFunctionReturnTypes }[]>([]);
    const [reportDetails, setReportDetails] = useState<ReportDetailsType[]>([]);
    const [tableData, setTableData] = useState<mew[]>([]);

    const mergeArrays = (prod:defData[],gmt:defData[])=>{
        // console.table(prod)
        // console.table(gmt)

        const realMerge = [...prod,...gmt]
        // console.log("realMerge",realMerge)
        return realMerge
    }


    // const sortOrder = ['front', 'back', 'assembly', 'line-end'];

    function groupAndSortByPart(data: any[]) {
        // Define the mapping from original part names to new names
        const partNameMapping: { [key: string]: string } = {
            front: "Front QC",
            back: "Back QC",
            assembly: "Assembly QC",
            "line-end": "End QC",
        };
    
        // Group the data by 'part'
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.part]) {
                acc[item.part] = [];
            }
            acc[item.part].push(item);
            return acc;
        }, {});
    
        // Sort the parts according to the sortOrder and prepare the result
        const sortOrder = ["front", "back", "assembly", "line-end"];
        const sortedGroupedData = sortOrder.map((part) => {
            if (groupedData[part]) {
                return {
                    part: partNameMapping[part], // Use the mapping here
                    data: groupedData[part].sort((a: any, b: any) => {
                        return parseInt(b.count, 10) - parseInt(a.count, 10); 
                        // desending order
                    }),
                };
            }
            return null; 
        }).filter(item => item !== null); 
        // to remove null values
    
        return sortedGroupedData;
    }
    
   
    

    const handleGenerateReport = async (data: { obbSheetId: string; date: Date }) => {
        data.date.setDate(data.date.getDate() + 1);
        const formattedDate = data.date.toISOString().split('T')[0];

        const obbSheet = await fetchObbSheetDetails(data.obbSheetId);

        const garmentFrontDefects = await fetchGarmentDefectsWithOperations({ part: "front", date: formattedDate });
        const frontResults = gmtCalculationFunction(garmentFrontDefects);

        const garmentBackDefects = await fetchGarmentDefectsWithOperations({ part: "back", date: formattedDate });
        const backResults = gmtCalculationFunction(garmentBackDefects);
        
        const productAssemblyDefects = await fetchProductDefectsWithOperations({ part: "assembly", date: formattedDate });
        const assemblyResults = productCalculationFunction(productAssemblyDefects);

        const productLineEndDefects = await fetchProductDefectsWithOperations({ part: "line-end", date: formattedDate });
        const lineEndResults = productCalculationFunction(productLineEndDefects);

        const ProdDef = await getProdDefect(obbSheet ? obbSheet.id:"",formattedDate)
        console.log("ProdDef",ProdDef)
        const GmtDef = await getGmtDefect(obbSheet ? obbSheet.id:"",formattedDate)
        console.log("GmtDef",GmtDef)

        const merge = mergeArrays(ProdDef,GmtDef)
        
        const result = groupAndSortByPart(merge);
        setTableData(result)
    
    console.log("results",result);
        
        const formattedData: { label: string; data: HourlyQuantityFunctionReturnTypes }[] = [
            { label: "Front QC", data: frontResults },
            { label: "Back QC", data: backResults },
            { label: "Assembly QC", data: assemblyResults },
            { label: "End QC", data: lineEndResults },
        ];

        const reportDetails = [
            { label: "Date", value: formattedDate },
            { label: "Generated By", value: userName },
            { label: "Style", value: obbSheet?.style ?? "-" },
            { label: "Buyer", value: obbSheet?.buyer ?? "-" },
            { label: "Color", value: obbSheet?.color ?? "-" },
            { label: "Unit", value: obbSheet?.unitName ?? "-" },
            { label: "Line", value: obbSheet?.lineName ?? "-" },
            // { label: "Total DHU", value: formattedData.map(value => value.data.totalDHU).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2).toString() },
        ];

        setReportData(formattedData);
        setReportDetails(reportDetails);
        // console.log("AVG", reportDetails);

        const pdfElement = generatePdfReport(formattedData, reportDetails);
        setPdfLink(pdfElement);
    };

    const generatePdfReport = (reportData: any[], reportDetails: ReportDetailsType[]) => {
        return (
            <PDFDownloadLink
                document={
                    <DayEndLineAllQcReportTemplate
                        details={reportDetails}
                        data={reportData}
                        tableData= {tableData}
              
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
            <SelectObbSheetAndDate
                handleSubmit={handleGenerateReport}
            />
            {(reportData.length > 0 && reportDetails.length > 0) &&
                <div className='mt-8 p-8 bg-slate-100 rounded-lg border flex flex-col items-end gap-4'>
                    <div className='space-x-4'>
                        {pdfLink && (
                            <Button variant="default">
                                {pdfLink}
                            </Button>
                        )}
                    </div>
                    <div className='w-full pdf-viewer'>
                        <DayEndLineAllQcReportViewer
                            details={reportDetails}
                            data={reportData}
                            tableData= {tableData}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default DayEndLineAllQcReport