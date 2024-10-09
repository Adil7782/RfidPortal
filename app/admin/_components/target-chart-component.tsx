import { useEffect, useState } from 'react';
import BarChart from '../analytics/_components/bar-chart';
import { getData } from '../analytics/neew';

const TargetChartComponent = ({date}:{date:string}) => {
    const [data, setData] = useState<any>(null); // Adjust type based on your data structure
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(date);
                setData(result); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [date]);
    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data available</div>;

    return (
        <BarChart 
            hourlyTarget={data.hourlyTarget}
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

export default TargetChartComponent