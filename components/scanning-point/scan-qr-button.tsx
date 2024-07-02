"use client"

import { QrCode } from "lucide-react";

interface ScanQRButtonProps {
    handleOnClick: () => void;
}

const ScanQRButton = ({
    handleOnClick
}: ScanQRButtonProps) => {
    return (
        <button 
            onClick={handleOnClick}
            className="flex justify-center items-center gap-4 primary-bg text-white py-16 pl-36 pr-40 font-medium text-5xl rounded-2xl hover:shadow-xl"
        >
            <QrCode className="w-14 h-14"/>
            Scan QR
        </button>
    )
}

export default ScanQRButton