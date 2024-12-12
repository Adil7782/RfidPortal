import { fetchActiveObbSheets } from '@/actions/qc/fetch-active-obb-sheets';
import SelectObbSheet from '@/components/scanning-point/select-obb-sheet';

const GmtQCScanningPointDashboard = async () => {
    var obbSheets: ActiveObbSheetsType = [];

    try {
        obbSheets = await fetchActiveObbSheets();
    } catch (error) {
        console.error(error);
    }

    return (
        <div className='mx-auto max-w-4xl'>
            <SelectObbSheet obbSheets={obbSheets} route="/points/gmt-production-back-qc"/>
        </div>
    )
}

export default GmtQCScanningPointDashboard