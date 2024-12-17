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
            
        
            <FormSample units={data}></FormSample>
            {/* <AddLineEfficiencyResourcesForm /> */}
            {/* <Analytics ></Analytics> */}
        </div>
    )
}

export default LineEfficiencyResurces