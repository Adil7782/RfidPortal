"use client"

import { Rss } from "lucide-react";

interface ReadRFIDButtonProps {
    handleOnClick: () => void;
}

const ReadRFIDButton = ({
    handleOnClick
}: ReadRFIDButtonProps) => {
    return (
        <button 
            onClick={handleOnClick}
            className="flex justify-center items-center gap-4 primary-bg text-white py-16 pl-36 pr-40 font-medium text-5xl rounded-2xl hover:shadow-xl"
        >
            <Rss className="w-14 h-14"/>
            Read RFID
        </button>
    )
}

export default ReadRFIDButton