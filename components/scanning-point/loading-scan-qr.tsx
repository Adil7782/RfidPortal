import Image from "next/image"

const LoadingScanQR = () => {
  return (
    <div>
        <Image
            src='/images/scanning-qr.gif'
            alt="scanning qr"
            width={600}
            height={200} 
            className="mt-2 w-full rounded-md border"       
        />
        <div className="-mt-8 flex items-center justify-center gap-2 text-slate-500">
            <div className="animate-ping animate-ping-delayed w-3 h-3 bg-[#ea8460] rounded-full"/>
            Scanning...
        </div>
        <p className="mb-11 absolute bottom-0 text-xl text-slate-800 font-medium">Please scan your QR code</p>
    </div>
  )
}

export default LoadingScanQR