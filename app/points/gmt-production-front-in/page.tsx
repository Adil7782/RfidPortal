import { fetchActiveObbSheets } from '@/actions/qc/fetch-active-obb-sheets';
import SelectObbSheet from '@/components/scanning-point/select-obb-sheet';

const ScanningPoint3Page = async () => {
    var obbSheets: ActiveObbSheetsType = [];

    try {
        obbSheets = await fetchActiveObbSheets();
    } catch (error) {
        console.error(error);
    }

    return (
        <div className='mx-auto max-w-4xl'>
            <SelectObbSheet obbSheets={obbSheets} route="/points/gmt-production-front-in"/>
        </div>
    )
}

export default ScanningPoint3Page