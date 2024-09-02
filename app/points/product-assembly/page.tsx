import { fetchActiveObbSheets } from '@/actions/qc/fetch-active-obb-sheets';
import SelectObbSheet from '@/components/scanning-point/select-obb-sheet';

const ScanningPoint5Page = async () => {
    var obbSheets: ActiveObbSheetsType = [];

    try {
        obbSheets = await fetchActiveObbSheets();
    } catch (error) {
        console.error(error);
    }
    
    return (
        <div className='mx-auto max-w-2xl'>
            <SelectObbSheet obbSheets={obbSheets} route="/points/product-assembly"/>
        </div>
    )
}

export default ScanningPoint5Page