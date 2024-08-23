import { NextResponse } from "next/server";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

type DefectType = {
    name: string;
}

type BodyDataType = {
    qcPointNo: number;
    defects: DefectType[];
}

export async function POST(
    req: Request,
) {
    const body: BodyDataType = await req.json();
    
    const qcPointNo: number = body.qcPointNo;
    const defects: DefectType[] = body.defects;

    try {
        const formattingDefects = () => {
            return defects.map(defect => {
                return {
                    id: generateUniqueId(),
                    qcPointNo,
                    ...defect
                }
            });
        };
        const formattedDefects = formattingDefects();

        await db.defect.createMany({
            data: formattedDefects.map(data => data)
        })

        return new NextResponse("Defects created successfully", { status: 201 });
    } catch (error) {
        console.error("[QCSECTION_DEFECT_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}