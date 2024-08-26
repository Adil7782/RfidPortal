import GmtInQrScanningPanel from "@/components/scanning-point/gmt-in-qr-scanning-panel";

const ScanningPoint3Page = () => {
    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            <GmtInQrScanningPanel part="front" />
        </section>
    )
}

export default ScanningPoint3Page