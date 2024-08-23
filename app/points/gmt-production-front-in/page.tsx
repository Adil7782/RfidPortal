import GarmentScanningPanel from "./_components/garmet-scanning-panel";
import ScanningGmtQRDialogModel from "./_components/scanning-gmt-qr-dialog-model";

const ScanningPoint3Page = () => {
    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            {/* <ScanningGmtQRDialogModel /> */}
            <GarmentScanningPanel />
        </section>
    )
}

export default ScanningPoint3Page