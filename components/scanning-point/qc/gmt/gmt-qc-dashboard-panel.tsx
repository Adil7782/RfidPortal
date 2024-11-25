"use client"

import { useEffect, useState } from 'react';
import { Defect, ScanningPoint } from '@prisma/client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import QCAnalyticsChart from '@/components/scanning-point/qc/qc-analytics-chart';
import QCHourlyQuantityTable from '@/components/scanning-point/qc/qc-hourly-quantity-table';
import { fetchActiveObbOperations } from '@/actions/qc/fetch-active-obb-operations';
import GmtQCDefectsSection from './gmt-qc-defects-section';
import GmtQCQuantityCountTable from './gmt-qc-quantity-count-table';

interface GmtQCDashboardPanelProps {
    part: string;
    obbSheetId: string;
    defects: Defect[] | undefined;
    qcPointId: string;
    totalStatusCounts: StatusCountTypes;
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTypes[];
    dailyTarget: number | null;
}

const GmtQCDashboardPanel = ({
    part,
    obbSheetId,
    defects,
    qcPointId,
    totalStatusCounts,
    totalDHU,
    hourlyQuantity,
    dailyTarget
}: GmtQCDashboardPanelProps) => {
    const [obbOperations, setObbOperations] = useState<ActiveObbOperationsResType>([]);

    useEffect(() => {
        fetchObbOperations();
    }, [obbSheetId])

    const fetchObbOperations = async () => {
        const operations = await fetchActiveObbOperations(obbSheetId, part);
        setObbOperations(operations);
    }

    const analyticsChartData: QCAnalyticsChartDataType = {
        target: dailyTarget || 0,
        count: totalStatusCounts.pass + totalStatusCounts.reject,
        dhuPercentage: totalDHU
    };

    const quantityCountData = [
        { title: 'Inspect Qty', day: totalStatusCounts.totalInspect },
        { title: 'Pass Qty', day: totalStatusCounts.pass },
        { title: 'Rework Qty', day: totalStatusCounts.rework },
        { title: 'Reject Qty', day: totalStatusCounts.reject },
    ];

    return (
        <section className='w-full mt-4 mb-12 flex flex-col space-y-6'>
            <GmtQCQuantityCountTable 
                part={part}
                obbSheetId={obbSheetId}
                data={quantityCountData} 
            />

            <GmtQCDefectsSection
                part={part}
                obbSheetId={obbSheetId}
                qcPointId={qcPointId}
                defects={defects}
                obbOperations={obbOperations}
            />

            <div className='flex space-x-4'>
                <div className='w-1/3'>
                    {dailyTarget ? (
                        <QCAnalyticsChart analyticsChartData={analyticsChartData} />
                    ) : (
                        <div className='border border-yellow-300 p-4 bg-yellow-100 rounded-md text-yellow-800'>
                            Please set the daily target for this OBB & QC point
                        </div>
                    )}
                    <div className='mt-4 flex justify-between items-center py-2 pl-3 pr-4 bg-slate-100 rounded-md border'>
                        <ArrowLeft className='w-4 h-' />
                        <Link href={`/points/gmt-production-${part}-qc`} className='text-sm underline hover:opacity-80'>
                            Change OBB Sheet
                        </Link>
                    </div>
                </div>
                <div className='w-2/3'>
                    {hourlyQuantity.length > 0 &&
                        <QCHourlyQuantityTable hourlyQuantity={hourlyQuantity} />
                    }
                </div>
            </div>
        </section>
    )
}

export default GmtQCDashboardPanel