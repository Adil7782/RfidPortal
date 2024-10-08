import { useEffect, useState } from 'react';
import moment from 'moment-timezone'; // Ensure you have moment-timezone imported
import BarChart from '../analytics/_components/bar-chart';

const TargetChartComponent = ( date:any) => {
    const [data, setData] = useState<any>(null); // Adjust the type based on your data structure
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/getChartData?date=${encodeURIComponent(date.date)}`);
            console.log(date.date)
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                console.error("Failed to fetch data");
            }
            setLoading(false);
        };

        fetchData();
    }, [date]);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data available</div>;

    const updatedData = calculateHourlyTargets(data.pointData);

    return (
        <BarChart 
            hourlyTarget={updatedData}
            cuttingInCount={data.cuttingInCount}
            cuttingOutCount={data.cuttingOutCount}
            frontGmtCount={data.frontGmtCount}
            backGmtCount={data.backGmtCount}
            frontGmtQcCount={data.frontGmtQcCount}
            backGmtQcCount={data.backGmtQcCount}
            productAssembleCount={data.productAssembleCount}
            productAssembleQcCount={data.productAssembleQcCount}
        />
    );
};

const calculateHourlyTargets = (points: any[]) => {
    return points.map(point =>
        (point.dailyTarget && point.workingHours)
            ? point.dailyTarget / point.workingHours
            : null
    );
};

export default TargetChartComponent;
