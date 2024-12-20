import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { obbSheetId, routes } = body;

        if (
            !obbSheetId ||
            !Array.isArray(routes) ||
            !routes.every((r) => typeof r.slug === "string" && typeof r.isActive === "boolean")
        ) {
            return new NextResponse("Invalid request payload", { status: 400 });
        }

        // Construct the data for updating or creating
        const updatedData = routes.reduce((acc, route) => {
            acc[route.slug] = route.isActive;
            return acc;
        }, {});

        // Check if the obbSheetId exists in the database
        const existingRoute = await db.obbSheetRoute.findUnique({
            where: { obbSheetId },
        });

        let response;

        if (existingRoute) {
            // Update the existing record
            response = await db.obbSheetRoute.update({
                where: { obbSheetId },
                data: updatedData,
            });
        } else {
            // Create a new record
            response = await db.obbSheetRoute.create({
                data: {
                    obbSheetId,
                    ...updatedData,
                },
            });
        }

        return NextResponse.json({
            message: existingRoute ? "Route updated successfully" : "Route created successfully",
            route: response,
        });
    } catch (error) {
        console.error("[OBB_STYLE_ROUTE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}