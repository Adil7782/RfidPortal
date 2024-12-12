import { NextResponse } from "next/server";
import { Resend } from 'resend';
import moment from "moment-timezone";
import { renderToStream } from "@react-pdf/renderer";

import { db } from "@/lib/db";
import { fetchObbSheetDetails } from "@/actions/from-eliot/fetch-obb-sheet-details";
import { fetchGarmentDefectsWithOperations } from "@/actions/qc/gmt/fetch-garment-defects-with-operations";
import { fetchProductDefectsWithOperations } from '@/actions/qc/product/fetch-product-defects-with-operations';
import { calculateDhuAndAnalyzeDefects as gmtCalculationFunction } from '@/actions/qc/gmt/calculate-dhu-and-analyze-defects';
import { calculateDhuAndAnalyzeDefects as productCalculationFunction } from '@/actions/qc/product/calculate-dhu-and-analyze-defects';
import { processDefectTypesAndCounts } from "@/actions/qc/pocess-defect-types-and-counts";
import { pdfRenderToStream } from "@/actions/pdf-render-to-stream";

const resend = new Resend(process.env.RESEND_API_KEY);

type FuntionReturnType = {
    defectType: string;
    count: number;
}[];

const streamToBuffer = async (stream: NodeJS.ReadableStream) => {
    const chunks: any = [];
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", (err) => reject(err));
    });
};

export async function POST(
    req: Request,
) {
    // {POST]: /api/v1/auto-generate/line-end-report
    const { obbSheetId, to }: { obbSheetId: string, to: string[] } = await req.json();

    const today = moment().format('YYYY-MM-DD');

    try {
        // Step 1: Fetch ObbSheet details
        const obbSheet = await fetchObbSheetDetails(obbSheetId);

        // Step 2: Fetch and process the defects
        const garmentFrontDefects = await fetchGarmentDefectsWithOperations({ part: "front", obbSheetId: obbSheetId });
        const frontResults = gmtCalculationFunction(garmentFrontDefects);
        // const frontDefectsSummary = processDefectTypesAndCounts(garmentFrontDefects);

        const garmentBackDefects = await fetchGarmentDefectsWithOperations({ part: "back", obbSheetId: obbSheetId });
        const backResults = gmtCalculationFunction(garmentBackDefects);
        // const backDefectsSummary = processDefectTypesAndCounts(garmentBackDefects);

        const productAssemblyDefects = await fetchProductDefectsWithOperations({ part: "assembly", obbSheetId: obbSheetId });
        const assemblyResults = productCalculationFunction(productAssemblyDefects);
        // const assemblDefectsSummary = processDefectTypesAndCounts(productAssemblyDefects);

        const productLineEndDefects = await fetchProductDefectsWithOperations({ part: "line-end", obbSheetId: obbSheetId });
        const lineEndResults = productCalculationFunction(productLineEndDefects);
        // const lineEndDefectsSummary = processDefectTypesAndCounts(productLineEndDefects);

        // Step 3: Format the report contents
        // const defectsSummaryData: { label: string; data: { name: string; count: number }[] }[] = [
        //     { label: "Front QC", data: frontDefectsSummary },
        //     { label: "Back QC", data: backDefectsSummary },
        //     { label: "Assembly QC", data: assemblDefectsSummary },
        //     { label: "End QC", data: lineEndDefectsSummary }
        // ]

        const formattedData: { label: string; data: HourlyQuantityFunctionReturnTypes }[] = [
            { label: "Front QC", data: frontResults },
            { label: "Back QC", data: backResults },
            { label: "Assembly QC", data: assemblyResults },
            { label: "End QC", data: lineEndResults },
        ];

        const reportDetails = [
            { label: "Date", value: today },
            { label: "Style", value: obbSheet?.style ?? "-" },
            { label: "Buyer", value: obbSheet?.buyer ?? "-" },
            { label: "Color", value: obbSheet?.color ?? "-" },
            { label: "Unit", value: obbSheet?.unitName ?? "-" },
            { label: "Line", value: obbSheet?.lineName ?? "-" },
        ];

        const pdfStream = await pdfRenderToStream(formattedData, reportDetails);

        const pdfBuffer = (await streamToBuffer(pdfStream)) as Buffer;

        const data = await resend.emails.send({
            from: 'ELIoT Global Reports <reports@eliot.global>',
            to: to,
            subject: `Line End Report | ${today}`,
            html: "<p>Please find the attached line-end report.</p>",
            attachments: [
                {
                    filename: "line-end-report.pdf",
                    content: pdfBuffer.toString("base64")
                },
            ],
        });

        console.log('Email sent successfully:', data);

        return NextResponse.json(
            { message: "Report generated and sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[AUTO_EMAIL_LINE_END_REPORT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}