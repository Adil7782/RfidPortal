import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import moment from "moment-timezone";

import { db } from "@/lib/db";
import AddQCSectionTargetForm from "@/components/forms/add-qc-section-target-form";
import QCSectionTargetTable from "./qc-section-target-table";

const QCSectionTargetComponent = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');

    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');
    let verified: JwtPayloadType | undefined;

    if (token) {
        const { value } = token;
        const secret = process.env.JWT_SECRET || "";
        
        verified = verify(value, secret) as JwtPayloadType;
    };
    
    const qcSections = await db.qcSection.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    const qcSectionTargets = await db.qcSectionTarget.findMany({
        where: {
            date: today
        },
        select: {
            id: true,
            dailyTarget: true,
            workingHours: true,
            userEmail: true,
            qcSection: {
                select: {
                    name: true
                }
            }
        }
    });

    return (
        <section className='my-16 p-8 border rounded-lg bg-slate-50'>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-dark font-medium text-xl">Manage the QC target for today</h2>
                    <p className="mt-1 text-slate-500 text-sm">Please set the target for each QC sections if you did not already</p>
                </div>
                <AddQCSectionTargetForm qcSections={qcSections} email={verified?.user.email} />
            </div>
            <div className="mt-8">
                {qcSectionTargets ?
                    <QCSectionTargetTable qcSectionTargets={qcSectionTargets} />
                    :
                    <p className="text-slate-500">QC sections are not found with today&#39;s target</p>
                }
            </div>
        </section>
    )
}

export default QCSectionTargetComponent