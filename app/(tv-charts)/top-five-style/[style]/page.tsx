import EfficiencyAnalyticsChart from "./_components/analytics";


const Page = ({ params }: { params: { style: string } }) => {
    const name = params.style
    console.log(name)

   
    return (
      <div className="h-[300px]  ">
         <EfficiencyAnalyticsChart unitparam= {name}></EfficiencyAnalyticsChart>
      </div>
    )
  }
  export default Page;


  