import { db } from '@/lib/db';
import AnalyticsChart from './_components/analytics-chart';
import { CardTitle } from '@/components/ui/card';

const OperatorSMV = async () => {
   
    return (
        <div>
                        <div className="sticky top-16 py-2 pr-3 pl-6 w-full z-50 border-b rounded-t-lg  items-center bg-white/80 backdrop-blur-lg">

            <CardTitle className="text-center sticky">
                {" "}
                {" "}
                Top 5 Defects Style Wise
              </CardTitle>
              </div>
          
            <AnalyticsChart
                // obbSheets={obbSheets}
                title={"Title"}
            />

            
        </div>
    )
}

export default OperatorSMV