import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import LineComponent from "../_components/line-component";
import QCSectionTargetComponent from "../_components/qc-section-target-component";
// import BarChartComponent from "./_components/bar-chart-component";
import TargetChartComponent from "../_components/target-chart-component";
import { countProductsBySection } from "@/actions/count-products-by-section";
import { db } from "@/lib/db";
import { getUnits } from "../analytics/_components/actions";
import EfficiencyAnalyticsChart from "./analytics-chart";
// import EfficiencyAnalyticsChart from "./_components/analytics-chart";
// import { getUnits } from "./_components/actions";

const AdminAnalyticsPage = async () => {

    const data :any= await getUnits ()
    
    return (
        <div className='mt-2'>
          <EfficiencyAnalyticsChart
            // products={products}
          
            units= {data}
           


          
          ></EfficiencyAnalyticsChart>

        </div>
    )
}

export default AdminAnalyticsPage