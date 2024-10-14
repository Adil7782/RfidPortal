import Analytics from '../excel-test/_components/analytics';
import { getUnits } from './_components/actions';
import AddLineEfficiencyResourcesForm from './_components/add-line-efficiency-resources-form';
import FormSample from './_components/form-samp';

const LineEfficiencyResurces = async () => {


    const data= await getUnits()
    console.log(data)

    
    return (
        <div>
            {/* <AddLineEfficiencyResourcesForm /> */}
            <FormSample units={data}></FormSample>
            <Analytics ></Analytics>
        </div>
    )
}

export default LineEfficiencyResurces