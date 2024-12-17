"use client";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface RadialbarCircleChartProps {
    total: number;
    count: number;
    label: string;
}

const RadialbarCircleChart = ({ total, count, label }: RadialbarCircleChartProps) => {
    const percentage = total > 0 ? (count / total) * 100 : 0; // Ensure total > 0

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%",
                },
                dataLabels: {
                    value: {
                        fontSize: "14px",
                        fontFamily: "Inter",
                        color: "gray",
                    },
                    total: {
                        show: true,
                        label: label,
                        color: "#0980D4",
                        fontSize: "22px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        formatter: () => `${count}/${total}`, // No need for `w` if unused
                    },
                },
                track: {
                    background: "#e2e8f0",
                    strokeWidth: "95%",
                    margin: 5,
                },
            },
        },
        yaxis: {
            show: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#4caf50"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: "round",
        },
    };

    const series = [percentage];

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white rounded-lg">
            <div className="w-full">
                <Chart options={options} series={series} type="radialBar" height={280} />
            </div>
        </div>
    );
};

export default RadialbarCircleChart;