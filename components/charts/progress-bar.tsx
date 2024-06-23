"use client"

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ProgressBarProps {
    label: string;
    percentage: number;
    startColor: string;
    endColor?: string;
}

const ProgressBar = ({
    label,
    percentage,
    startColor,
    endColor
}: ProgressBarProps) => {
    const options: ApexOptions = {
        chart: {
            height: 70,
            type: 'bar',
            // stacked: true,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '20%',
                borderRadius: 6,
                colors: {
                    backgroundBarColors: ['#e2e8f0'],
                    backgroundBarRadius: 7
                }
            }
        },
        colors: [startColor],
        series: [{
            name: 'Process',
            data: [percentage]
        }],
        fill: {
            type: 'gradient',
            gradient: {
                inverseColors: false,
                gradientToColors: endColor ? [endColor] : undefined,
            },
        },
        xaxis: {
            categories: ['Process']
        },
        yaxis: {
            max: 100
        },
        title: {
            text: label,
            floating: true,
            style: {
                fontSize: '16px',
                fontFamily: 'Inter',
                fontWeight: 500,
                color: '#444'
            }
        },
        subtitle: {
            text: `${percentage}%`,
            floating: true,
            align: 'right',
            offsetY: 0,
            style: {
                fontSize: '16px',
                fontFamily: 'Inter',
                fontWeight: 500,
                color: '#444'
            }
        },
        tooltip: {
            enabled: false
        }
    };

    return (
        <div className="mt-4">
            <ReactApexChart options={options} series={options.series} type="bar" height={70} />
        </div>
    );
}

export default ProgressBar