"use client"

import { useEffect, useState } from 'react';
import { Defect, ScanningPoint } from '@prisma/client';

import QCAnalyticsChart from '@/components/scanning-point/qc-analytics-chart';
import QCQuantityCountTable from '@/components/scanning-point/qc-quantity-count-table';
import QCHourlyQuantityTable from '@/components/scanning-point/qc-hourly-quantity-table';
import { fetchActiveObbOperations } from '@/actions/qc/fetch-active-obb-operations';
import QCDefectsSection from './qc-defects-section';

interface QCDashboardPanelProps {
    obbSheetId: string;
    defects: Defect[] | undefined;
    qcPoint: ScanningPoint | null;
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTypes[];
}

const QCDashboardPanel = ({
    obbSheetId,
    defects,
    qcPoint,
    totalStatusCounts,
    currentHourStatusCounts,
    totalDHU,
    hourlyQuantity
}: QCDashboardPanelProps) => {
    const [obbOperations, setObbOperations] = useState<ActiveObbOperationsResType>([]);

    useEffect(() => {
        fetchObbOperations();
    }, [obbSheetId])

    const fetchObbOperations = async () => {
        const operations = await fetchActiveObbOperations(obbSheetId);
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

            <QCDefectsSection 
                qcPointId={qcPoint?.id}
                defects={defects}
                obbOperations={obbOperations}
            />

            <div className='flex space-x-4'>
                {qcPoint && qcPoint.dailyTarget &&
                    <>
                        <div className='w-1/3 h-fit'>
                            <QCAnalyticsChart analyticsChartData={analyticsChartData} />
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

export default QCDashboardPanel