"use client"

import Link from 'next/link';
import { Defect } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';

import QCAnalyticsChart from '@/components/scanning-point/qc/qc-analytics-chart';
import QCQuantityCountTable from '@/components/scanning-point/qc/qc-quantity-count-table';
import QCHourlyQuantityTable from '@/components/scanning-point/qc/qc-hourly-quantity-table';
import ProductQCDefectsSection from './product-qc-defects-section';

interface ProductQCDashboardPanelProps {
    part: string;
    line: string;
    defects: Defect[] | undefined;
    qcPointId: string;
    totalStatusCounts: StatusCountTypes;
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTypes[];
    dailyTarget: number | null;
}

const ProductQCDashboardPanel = ({
    part,
    line,
    defects,
    qcPointId,
    totalStatusCounts,
    totalDHU,
    hourlyQuantity,
    dailyTarget,
}: ProductQCDashboardPanelProps) => {
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
            <QCQuantityCountTable data={quantityCountData} />

            <ProductQCDefectsSection
                part={part}
                line={line}
                qcPointId={qcPointId}
                defects={defects}
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
                        <Link href="/points/finishing-line-qc" className='text-sm underline hover:opacity-80'>
                            Change Line
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

export default ProductQCDashboardPanel