import { NextResponse } from "next/server";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

type DefectType = {
    name: string;
}

type QcSectionType = {
    name: string;
    defects: DefectType[];
}

export async function POST(
    req: Request,
) {
    const qcSectionData: QcSectionType = await req.json();

    const qcSectionId = generateUniqueId();
    
    const defects: DefectType[] = qcSectionData.defects;

    try {
        const formattingDefects = () => {
            return defects.map(defect => {
                return {
                    id: generateUniqueId(),
                    qcSectionId,
                    ...defect
                }
            });
        };
        const formattedDefects = formattingDefects();

        const newQcSection = await db.qcSection.create({
            data: {
                id: qcSectionId,
                name: qcSectionData.name
            }
        });

        const newDefects = await db.defect.createMany({
            data: formattedDefects
        })

        return NextResponse.json({ bundleData: newQcSection, gmtData: newDefects, message: 'QC section and Defects created successfully' }, { status: 201 });
    } catch (error) {
        console.error("[QCSECTION_DEFECT_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}