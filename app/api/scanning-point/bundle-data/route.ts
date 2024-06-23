import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');

    try {
        if (!qrCode) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }
        
        const bundleData = await db.bundleData.findUnique({
            where: {
                bundleBarcode: parseInt(qrCode)
            }
        });

        return NextResponse.json({ data: bundleData, message: 'Fetched Data successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
) {
    const bundleData: BundleDataType = await req.json();

    const url = new URL(req.url);
    const userEmail = url.searchParams.get('email');

    const bundleId = generateUniqueId();
    
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    
    const gmtData: GarmentDataType[] = bundleData.garments;

    try {
        const existingBundle = await db.bundleData.findUnique({
            where: {
                bundleBarcode: parseInt(bundleData.bundleBarcode)
            }
        });

        if (existingBundle) {
            return new NextResponse("Bundle is already exist!", { status: 409 })
        };

        const formattingGmtData = () => {
            return gmtData.map(garment => {
                return {
                    id: generateUniqueId(),
                    bundleId: bundleId,
                    ...garment
                }
            });
        };
        const formattedGmtData = formattingGmtData();

        const newBundle = await db.bundleData.create({
            data: {
                id: bundleId,
                bundleBarcode: parseInt(bundleData.bundleBarcode),
                bundleNo: parseInt(bundleData.bundleNo),
                color: bundleData.color,
                quantity: parseInt(bundleData.quantity),
                startPly: parseInt(bundleData.startPly),
                endPly: parseInt(bundleData.endPly),
                cuttingNo: parseInt(bundleData.cuttingNo),
                cuttingDate: bundleData.cuttingDate,
                size: bundleData.size,
                buyerName: bundleData.buyerName,
                storeInTimestamp: timestamp,
                userEmail: userEmail || "",
            }
        });

        const newGmt = await db.gmtData.createMany({
            data: formattedGmtData
        })

        return NextResponse.json({ bundleData: newBundle, gmtData: newGmt, message: 'Bundle and gmt data created successfully' }, { status: 201 });
    } catch (error) {
        console.error("[BUNDLE_GMT_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}