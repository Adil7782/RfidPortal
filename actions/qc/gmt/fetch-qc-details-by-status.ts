"use server"

import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function fetchQcDetailsByStatus(part: string, obbSheetId: string, qcStatus: string): Promise<GmtQcDetailsType[]> {
    try {
        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = moment().tz(timezone).format('YYYY-MM-DD');
        const startDate = `${today} 00:00:00`;
        const endDate = `${today} 23:59:59`;

        if (qcStatus !== 'all') {
            const data = await db.gmtDefect.findMany({
                where: {
                    part,
                    obbSheetId,
                    qcStatus,
                    timestamp: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                select: {
                    id: true,
                    gmtData: {
                        select: {
                            gmtBarcode: true,
                            color: true,
                            shade: true,
                            size: true,
                            styleNo: true,
                            buyerName: true,
                            serialNumber: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc"
                }
            });
            return new Promise((resolve) => resolve(data as GmtQcDetailsType[]));
        } else {
            const data = await db.gmtDefect.findMany({
                where: {
                    part,
                    obbSheetId,
                    timestamp: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                select: {
                    id: true,
                    qcStatus: true,
                    gmtData: {
                        select: {
                            gmtBarcode: true,
                            color: true,
                            shade: true,
                            size: true,
                            styleNo: true,
                            buyerName: true,
                            serialNumber: true
                        }
                    }
                },
                orderBy: {
                    qcStatus: "asc"
                }
            });
            return new Promise((resolve) => resolve(data as GmtQcDetailsType[]));
        }
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}