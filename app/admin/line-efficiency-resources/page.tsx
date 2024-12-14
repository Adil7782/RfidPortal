import { CardTitle } from '@/components/ui/card';
import Analytics from '../excel-test/_components/analytics';
import { getUnits } from './_components/actions';
import AddLineEfficiencyResourcesForm from './_components/add-line-efficiency-resources-form';
import FormSample from './_components/form-samp';

const LineEfficiencyResurces = async () => {


    const data= await getUnits()
    // console.log(data)

    
    return (
        <div>
            
<div className="sticky top-16 py-2 pr-3 pl-6 w-full z-50 border-b rounded-t-lg  items-center bg-white/80 backdrop-blur-lg">

<CardTitle className="text-center sticky">
    {" "}
    {" "}
    Line Efficiency Resources
  </CardTitle>
            <FormSample units={data}></FormSample>
  </div>
            {/* <AddLineEfficiencyResourcesForm /> */}
            {/* <Analytics ></Analytics> */}
        </div>
    )
}

export default LineEfficiencyResurces