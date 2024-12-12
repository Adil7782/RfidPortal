import React from 'react'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
// import TargetChartComponent from '../../_components/target-chart-component';
import BarChartComponent from './bar-chart-component';

import { countProductsBySection } from "@/actions/count-products-by-section";
import TargetChartComponent from '../../_components/target-chart-component';


type obj = {
    frontGmtCount: number;
        backGmtCount: number;
        products:any;
        date:string;
}

const TabCompo = ({frontGmtCount,
    backGmtCount,products,date}:obj) => {

        
  return (
    <div>
        
        <BarChartComponent 
                        frontGmtCount={frontGmtCount}
                        backGmtCount={backGmtCount}
                        sectionCounts={countProductsBySection(products)} 
                    />
        {/* <TargetChartComponent date={date}/> */}

{/* <Tabs defaultValue="targetChart" className="w-full">
                <div className="w-full flex justify-between items-center gap-8">
                    <TabsList className="grid md:w-2/3 grid-cols-2">
                        <TabsTrigger value="targetChart" className="text-base">Target Chart</TabsTrigger>
                        <TabsTrigger value="poductCountChart" className="text-base">Product Count Chart</TabsTrigger>
                        <TabsTrigger value="line" className="text-base">Manage Lines</TabsTrigger>
                        <TabsTrigger value="qc-target" className="text-base">Manage QC Section Target</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="targetChart">
                    <TargetChartComponent date={date}/>
                </TabsContent>
                <TabsContent value="poductCountChart">
                    <BarChartComponent 
                        frontGmtCount={frontGmtCount}
                        backGmtCount={backGmtCount}
                        sectionCounts={countProductsBySection(products)} 
                    />
                </TabsContent> 
                
            </Tabs> */}


    </div>
  )
}

export default TabCompo