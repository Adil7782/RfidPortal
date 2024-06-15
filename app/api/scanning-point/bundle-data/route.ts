import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');

    try {
        const apiResponse = await axios.get(`https://cutting.hisanmastery.com/api/ProductionData/GetBundleList?bundleBarcode=${qrCode}`, {
            headers: {
                'X-API-Key': '4d7b1c3e-9a2f-45d8-a61e-82f0e394c72a'
            },
        });
        
        return NextResponse.json({ data: apiResponse.data, message: 'Fetched Data successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_QR_DATA_FROM_SERVER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}