// import SelectObbSheetDateHour from "@/components/dashboard/common/select-obbsheet-date-hour"
import { db } from "@/lib/db";
import EfficiencyAnalyticsChart from "./_components/analytics-chart";
import { getUnit } from "./_components/actions";
import { CardTitle } from "@/components/ui/card";

const AchivementRateoperation = async () => {
    
const unit = await getUnit() ;


// console.log("hello",unit)


    return (
        <div>





            <EfficiencyAnalyticsChart
                obbSheets={"obbSheets"}
                units={unit}
            />
            
        </div>




    )
}

export default AchivementRateoperation