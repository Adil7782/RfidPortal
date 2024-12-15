"use client";

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ProgressBarProps {
    label: string;
    percentage: number;
    startColor: string;
    endColor?: string;
}

const ProgressBar = ({ label, percentage, startColor, endColor }: ProgressBarProps) => {
    const options: ApexOptions = {
        chart: {
            height: 70,
            type: "bar",
            sparkline: { enabled: true },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "20%",
                borderRadius: 6,
                colors: {
                    backgroundBarColors: ["#e2e8f0"],
                    backgroundBarRadius: 7,
                },
            },
        },
        colors: [startColor],
        fill: {
            type: "gradient",
            gradient: {
                inverseColors: false,
                gradientToColors: endColor ? [endColor] : [startColor], // Ensure a default endColor
                stops: [0, 100],
            },
        },
        xaxis: {
            categories: ["Process"],
        },
        yaxis: {
            show: true,
            max: 100,
            labels: {
                formatter: (value) => `${value}%`, // Add labels for better clarity
            },
        },
        title: {
            text: label,
            floating: true,
            style: {
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 500,
                color: "#444",
            },
        },
        subtitle: {
            text: `${percentage}%`,
            floating: true,
            align: "right",
            style: {
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 500,
                color: "#444",
            },
        },
        tooltip: { enabled: false },
    };

    const series = [
        {
            name: "Process",
            data: [percentage],
        },
    ];

    return (
        <div className="mt-4">
            <ReactApexChart options={options} series={series} type="bar" height={70} />
        </div>
    );
};

export default ProgressBar;