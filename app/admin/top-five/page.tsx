import { db } from '@/lib/db';
import AnalyticsChart from './_components/analytics-chart';
import { CardTitle } from '@/components/ui/card';

const OperatorSMV = async () => {
    // const obbSheets = await db.obbSheet.findMany({
    //     where: {
    //         isActive: true,
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     select: {
    //         id: true,
    //         name: true
    //     }
    // });
    return (
        <div>
                      
          
            <AnalyticsChart
                // obbSheets={obbSheets}
                title={"Title"}
            />

            
        </div>
    )
}

export default OperatorSMV