import { fetchActiveObbSheets } from '@/actions/qc/fetch-active-obb-sheets';
import SelectObbSheet from '@/components/scanning-point/select-obb-sheet'
import axios from 'axios';

const GmtQCScanningPointDashboard = async () => {
    var obbSheets: ActiveObbSheetsType = [];

    try {
        obbSheets = await fetchActiveObbSheets();
    } catch (error) {
        console.error(error);
    }

    return (
        <div className='mx-auto max-w-2xl'>
            <SelectObbSheet obbSheets={obbSheets} part="front"/>
        </div>
    )
}

export default GmtQCScanningPointDashboard