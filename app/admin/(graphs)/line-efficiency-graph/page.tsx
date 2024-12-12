// import SelectObbSheetDateHour from "@/components/dashboard/common/select-obbsheet-date-hour"
import { db } from "@/lib/db";

import { CardTitle } from "@/components/ui/card";
import EfficiencyAnalyticsChart from "./_components/analytics-chart";
import { getUnit } from "./_components/actions";

const AchivementRateoperation = async () => {
    
const unit = await getUnit() ;


// console.log("hello",unit)


    return (
        <div>


<div className="sticky top-16 py-2 pr-3 pl-6 w-full z-50 border-b rounded-t-lg  items-center bg-white/80 backdrop-blur-lg">

            <CardTitle className="text-center sticky">
                {" "}
                {" "}
                Line Efficiency Graph
              </CardTitle>
              </div>



            <EfficiencyAnalyticsChart
                obbSheets={"obbSheets"}
                units={unit}
            />
            
        </div>




    )
}

export default AchivementRateoperation