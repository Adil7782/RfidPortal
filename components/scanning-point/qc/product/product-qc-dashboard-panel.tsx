"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Defect, ScanningPoint } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';

import QCAnalyticsChart from '@/components/scanning-point/qc/qc-analytics-chart';
import QCQuantityCountTable from '@/components/scanning-point/qc/qc-quantity-count-table';
import QCHourlyQuantityTable from '@/components/scanning-point/qc/qc-hourly-quantity-table';
import { fetchActiveObbOperations } from '@/actions/qc/fetch-active-obb-operations';
import ProductLineEndQCDefectsSection from './product-line-end-qc-defects-section';
import ProductQCDefectsSection from './product-qc-defects-section';

interface ProductQCDashboardPanelProps {
    part: string;
    route: string;
    obbSheetId: string;
    defects: Defect[] | undefined;
    qcPoint: ScanningPoint | null;
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTypes[];
}

const ProductQCDashboardPanel = ({
    part,
    route,
    obbSheetId,
    defects,
    qcPoint,
    totalStatusCounts,
    currentHourStatusCounts,
    totalDHU,
    hourlyQuantity
}: ProductQCDashboardPanelProps) => {
    const [obbOperations, setObbOperations] = useState<ActiveObbOperationsResType>([]);

    useEffect(() => {
        fetchObbOperations();
    }, [obbSheetId])

    const fetchObbOperations = async () => {
        const operations = await fetchActiveObbOperations(obbSheetId, part);
        setObbOperations(operations);
    }

    const analyticsChartData: QCAnalyticsChartDataType = {
        target: qcPoint?.dailyTarget || 0,
        count: totalStatusCounts.pass + totalStatusCounts.reject,
        dhuPercentage: totalDHU
    };

    const quantityCountData = [
        { title: 'Inspect Qty', hour: currentHourStatusCounts.totalInspect, day: totalStatusCounts.totalInspect },
        { title: 'Pass Qty', hour: currentHourStatusCounts.pass, day: totalStatusCounts.pass },
        { title: 'Rework Qty', hour: currentHourStatusCounts.rework, day: totalStatusCounts.rework },
        { title: 'Reject Qty', hour: currentHourStatusCounts.reject, day: totalStatusCounts.reject },
    ];

    return (
        <section className='w-full mt-4 mb-12 flex flex-col space-y-6'>
            <QCQuantityCountTable data={quantityCountData} />

            {(part === 'line-end' || part === 'assembly') ? 
                <ProductLineEndQCDefectsSection
                    part={part}
                    obbSheetId={obbSheetId}
                    qcPointId={qcPoint?.id}
                    defects={defects}
                    obbOperations={obbOperations}
                />
            :
                <ProductQCDefectsSection
                    part={part}
                    obbSheetId={obbSheetId}
                    qcPointId={qcPoint?.id}
                    defects={defects}
                />
            }

            <div className='flex space-x-4'>
                {qcPoint && qcPoint.dailyTarget &&
                    <>
                        <div className='w-1/3'>
                            <QCAnalyticsChart analyticsChartData={analyticsChartData} />
                            <div className='mt-4 flex justify-between items-center py-2 pl-3 pr-4 bg-slate-100 rounded-md border'>
                                <ArrowLeft className='w-4 h-' />
                                <Link href={route} className='text-sm underline hover:opacity-80'>
                                    Change OBB Sheet
                                </Link>
                            </div>
                        </div>
                        <div className='w-2/3'>
                            {hourlyQuantity.length > 0 &&
                                <QCHourlyQuantityTable hourlyQuantity={hourlyQuantity} />
                            }
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default ProductQCDashboardPanel