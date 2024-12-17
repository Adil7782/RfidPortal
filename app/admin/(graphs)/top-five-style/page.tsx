import { db } from '@/lib/db';
import AnalyticsChart from './_components/analytics-chart';
import { CardTitle } from '@/components/ui/card';

const OperatorSMV = async () => {
   
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