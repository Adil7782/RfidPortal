"use client"

import dynamic from 'next/dynamic';

const ProgressBar = dynamic(() => import('@/components/charts/progress-bar'), {
    ssr: false
});
const RadialbarCircleChart = dynamic(() => import('@/components/charts/radialbar-circle-chart'), {
    ssr: false
});

interface QCAnalyticsChartProps {
    circleChart: CircleChartDataType;
    progressBar: ProgressiveBarChartDataType[];
}

const QCAnalyticsChart = ({
    circleChart,
    progressBar
}: QCAnalyticsChartProps) => {
    return (
        <div className="space-y-4">
            <div className='flex flex-row p-1.5 bg-slate-100/70 rounded-lg border'>
                <div className='w-1/3 flex flex-col gap-2'>
                    <div className='group h-1/2 min-h-32 bg-[#0980D4]/5 rounded-md border border-[#0980D4]/20 hover:border-[#0980D4]/50 transition-all'>
                        <p className='text-center mt-3 text-slate-400 group-hover:text-slate-500 transition-all'>Total</p>
                        <h2 className='text-center mt-4 text-3xl font-bold primary-text'>{circleChart.total}</h2>
                    </div>
                    <div className='group h-1/2 min-h-32 bg-[#0980D4]/5 rounded-md border border-[#0980D4]/20 hover:border-[#0980D4]/50 transition-all'>
                        <p className='text-center mt-3 text-slate-400 group-hover:text-slate-500 transition-all'>{circleChart.chartName}</p>
                        <h2 className='text-center mt-4 text-3xl font-bold primary-text'>{circleChart.count}</h2>
                    </div>
                </div>
                <div className='2/3'>
                    <RadialbarCircleChart total={430} count={290} label={circleChart.chartName} />
                </div>
            </div>
            <div className="px-4 py-2 bg-slate-100 border rounded-lg">
                {progressBar.map((data) => (
                    <ProgressBar key={data.label} label={data.label} percentage={data.percentage} startColor={data.startColor || 'red'} endColor={data.endColor || "blue"} />
                ))}
            </div>
        </div>
    )
}

export default QCAnalyticsChart