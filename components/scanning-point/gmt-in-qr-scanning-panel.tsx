"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { QrCode } from "lucide-react";
import { GmtData } from "@prisma/client";
import { toast as hotToast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LoadingAndScanningQR from "@/components/scanning-point/loading-and-scanning-qr";
import GarmentDataTable from "@/components/scanning-point/garment-data-table";
import GmtDataCategoryTable from "./gmt-data-catogery-table";

interface GmtInQrScanningPanelProps {
    part: string;
    gmtCount: number;
    obbSheetId: string;
}

const GmtInQrScanningPanel = ({ part, gmtCount, obbSheetId }: GmtInQrScanningPanelProps) => {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [updatedQrCode, setUpdatedQrCode] = useState('');
    const [gmtData, setGmtData] = useState<GmtData[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') { // When 'Enter' is pressed, consider the scan complete
            event.preventDefault();  // Prevent the default 'Enter' action
            const scannedValue = event.currentTarget.value.trim();
            if (scannedValue) {
                if (part === 'front') {
                    if (scannedValue.endsWith('B')) {   // Handle validation for BACK QR Codes
                        hotToast.error("You are scanning a BACK QR code, Please scan FRONT QR!");
                    } else if (scannedValue.endsWith('F')) {
                        setQrCode(scannedValue);
                    } else {
                        hotToast.error("Invalid QR Code, Please try again");
                    }
                } else if (part === 'back') {
                    if (scannedValue.endsWith('B')) {
                        setQrCode(scannedValue);
                    } else if (scannedValue.endsWith('F')) {   // Handle validation for FRONT QR Codes
                        hotToast.error("You are scanning a FRONT QR code, Please scan BACK QR!");
                    } else {
                        hotToast.error("Invalid QR Code, Please try again");
                    }
                }
            }
            event.currentTarget.value = '';  // Clear the input for the next scan
        }
    };

    const handleSaveData = async () => {
        setIsLoading(true);
        if (qrCode) {
            try {
                const res = await axios.patch(`/api/scanning-point/gmt-data/update?qrCode=${qrCode}&obb=${obbSheetId}`);
                hotToast.success("GMT data updated successfully!");
                
                setUpdatedQrCode(res.data.data.gmtBarcode);
                setGmtData([res.data.data, ...gmtData]);
            } catch (error: any) {
                hotToast.error(error.response.data || "Something went wrong");
            }
        }
        setQrCode('');
        setIsLoading(false);
    };

    useEffect(() => {
        handleSaveData();
        inputRef.current?.focus();
    }, [qrCode]);

    const handleStop = () => {
        setQrCode('');
        setUpdatedQrCode('');
        setGmtData([]);
        setIsScanning(false);
        router.refresh();
    }

    return (
        <section className='space-y-8 w-full'>
            <div className='w-full border flex flex-row'>
                {/* Left */}
                <div className='w-1/3 border-r'>
                    {/* QR input listener */}
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyPress}
                        aria-hidden="true"
                        className='opacity-0 absolute top-[-1000]'
                    />

                    {/* Left Top */}
                    <div className="p-4">
                        {isScanning ?
                            <div>
                                <LoadingAndScanningQR isLoading={isLoading} />
                                <Button onClick={handleStop} variant="secondary" className="mt-4 w-full hover:border">
                                    Stop Scanning
                                </Button>
                            </div>
                            :
                            <button
                                onClick={() => { setIsScanning(true); inputRef.current?.focus(); }}
                                className="w-full h-20 flex justify-center items-center gap-4 primary-bg text-white font-medium text-2xl rounded-lg"
                            >
                                <QrCode className="w-8 h-8" />
                                Scan QR
                            </button>
                        }
                    </div>
                    <Separator />

                    {/* Left Bottom */}
                    <div className='p-4 space-y-4'>
                        {updatedQrCode &&
                            <div className="flex justify-between items-center bg-green-200/30 p-4 rounded-lg text-green-600">
                                <p className="">Recently updated:</p>
                                <p className="">{updatedQrCode}</p>
                            </div>
                        }
                        <div className='p-4 space-y-4 bg-slate-100 rounded-md'>
                            <div className='flex justify-between items-center'>
                                <p className="font-medium text-slate-800">No. of scanned garments</p>
                                <p className="text-slate-600 text-sm">{gmtCount + gmtData.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-2/3 p-4'>
                    <GarmentDataTable gmtData={gmtData}/>
                    {gmtData.length > 0 &&
                        <Button
                            onClick={handleStop}
                            variant="outline"
                            className="px-12 mt-4"
                        >
                            Clear
                        </Button>
                    }
                </div>
            </div>
            <GmtDataCategoryTable part={part} obbSheetId={obbSheetId}/>
        </section>
    )
}

export default GmtInQrScanningPanel