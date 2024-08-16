import CuttingStoreScanningPanel from "./_components/cutting-store-scanning-panel";
import ScanningBundleQRDialogModel from "./_components/scanning-bundle-qr-dialog-model";

const ScanningPoint2Page = () => {
  return (
    <section className='p-4 h-full flex flex-col justify-center items-center'>
      {/* <ScanningBundleQRDialogModel /> */}
      <CuttingStoreScanningPanel />
    </section>
  )
}

export default ScanningPoint2Page