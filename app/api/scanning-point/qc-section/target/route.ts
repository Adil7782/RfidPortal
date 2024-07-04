import { NextResponse } from "next/server";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { userEmail, dailyTarget, workingHours, qcSectionId } = await req.json();
    const id = generateUniqueId();

    try {
        const existingTarget = await db.qcSectionTarget.findUnique({
            where: {
                qcSectionId
            }
        });

        if (existingTarget) {
            // Update the target
            const updatedTarget = await db.qcSectionTarget.update({
                where: {
                    qcSectionId
                },
                data: {
                    userEmail,
                    dailyTarget,
                    workingHours
                }
            });

            return NextResponse.json({ data: updatedTarget, message: 'QC section target updated successfully!'}, { status: 201 });
        } else {
            // Create a new target
            const createdTarget = await db.qcSectionTarget.create({
                data: {
                    id,
                    userEmail,
                    qcSectionId,
                    dailyTarget,
                    workingHours
                }
            });
            
            return NextResponse.json({ data: createdTarget, message: 'QC section target created successfully!'}, { status: 201 });
        }

    } catch (error) {
        console.error("[QCSECTION_TARGET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}