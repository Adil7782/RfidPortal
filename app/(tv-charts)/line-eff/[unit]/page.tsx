import EfficiencyAnalyticsChart from "./_components/analytics";


const Page = ({ params }: { params: { unit: string } }) => {
    const name = params.unit

   
    return (
      <div className="h-[300px]  ">
         <EfficiencyAnalyticsChart unitparam= {name}></EfficiencyAnalyticsChart>
      </div>
    )
  }
  export default Page;


  