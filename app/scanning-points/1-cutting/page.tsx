"use client"

import ScanQRButton from '@/components/scanning-point/scan-qr-button'
import ScanningBundleQRDialogModel from '@/components/scanning-point/scanning-bundle-qr-dialog-model'

const SP1CuttingPage = () => {
  return (
    <section className='p-4 h-full flex flex-col justify-center items-center'>
      <ScanningBundleQRDialogModel />
      {/* <div className='w-full flex justify-center items-center h-96 p-4 bg-slate-100 border border-[#0980D4] rounded-lg mt-4 text-4xl'>
        QR Table
      </div> */}
    </section>
  )
}

export default SP1CuttingPage