import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import LineComponent from "../_components/line-component";
import QCSectionTargetComponent from "../_components/qc-section-target-component";
import BarChartComponent from "./_components/bar-chart-component";
import TargetChartComponent from "../_components/target-chart-component";
import { countProductsBySection } from "@/actions/count-products-by-section";
import { db } from "@/lib/db";
import EfficiencyAnalyticsChart from "./_components/analytics-chart";
import { getUnits } from "./_components/actions";

const AdminAnalyticsPage = async () => {
    const products = await db.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    const frontGmtCount = await db.gmtData.count({
        where: {
            partName: "FRONT",
            timestampProduction: { not: null }
        }
    });
    const backGmtCount = await db.gmtData.count({
        where: {
            partName: "BACK",
            timestampProduction: { not: null }
        }
    });
    const data :any= await getUnits ()
    
    return (
        <div className='mt-14'>
          <EfficiencyAnalyticsChart
            // products={products}
            frontGmtCount={frontGmtCount}
            backGmtCount={backGmtCount}
            units= {data}
            products={products}


          
          ></EfficiencyAnalyticsChart>

        </div>
    )
}

export default AdminAnalyticsPage