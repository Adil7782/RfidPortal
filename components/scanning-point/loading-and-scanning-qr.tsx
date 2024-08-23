import { Loader2 } from "lucide-react"
import Image from "next/image"

interface LoadingAndScanningQRProps {
  isLoading: boolean
}

const LoadingAndScanningQR = ({
  isLoading
}: LoadingAndScanningQRProps) => {
  return (
    <div>
        {!isLoading ?
            <>
                <Image
                    src='/images/scanning-qr.gif'
                    alt="scanning qr"
                    width={600}
                    height={200} 
                    className="w-full h-[172px] rounded-md border"       
                />
                {/* <div className="-mt-8 flex items-center justify-center gap-2 text-slate-500">
                    <div className="animate-ping animate-ping-delayed w-3 h-3 bg-[#ea8460] rounded-full"/>
                    Scanning...
                </div> */}
                {/* <p className="mb-11 absolute bottom-0 text-xl text-slate-800 font-medium">Please scan your QR code</p> */}
            </>
        :
            <div className="flex flex-col justify-center items-center bg-slate-100 rounded-lg h-[172px] text-sm text-slate-500 gap-2">
                <Loader2 className="animate-spin w-8 h-8" />
                Loading...
            </div>
        }
    </div>
  )
}

export default LoadingAndScanningQR