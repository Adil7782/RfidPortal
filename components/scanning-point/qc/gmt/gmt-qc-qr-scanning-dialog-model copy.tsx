"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { QrCode } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingScanQR from "@/components/scanning-point/loading-scan-qr";

interface GmtQcQrScanningDialogModelProps {
    part: string;
    isOpen: boolean;
    toggleDialog: () => void;
    handleGmtData: (data: SchemaGmtDataType) => void;
}

const GmtQcQrScanningDialogModel = ({
    part,
    isOpen,
    toggleDialog,
    handleGmtData
}: GmtQcQrScanningDialogModelProps) => {
    const [qrData, setQrData] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // When 'Enter' is pressed, consider the scan complete
            event.preventDefault();  // Prevent the default 'Enter' action
            const scannedValue = event.currentTarget.value.trim();
            if (scannedValue) {
                if (part === 'front') {
                    if (scannedValue.endsWith('B')) {   // Handle validation for BACK QR Codes
                        hotToast.error("You are scanning a BACK QR code, Please scan FRONT QR!");
                    } else if (scannedValue.endsWith('F')) {
                        setQrData(scannedValue);
                    } else {
                        hotToast.error("Invalid QR Code, Please try again");
                    }
                } else if (part === 'back') {
                    if (scannedValue.endsWith('B')) {
                        setQrData(scannedValue);
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

    const router = useRouter();

    const fetchDataFromDatabase = async () => {
        if (qrData) {
            await axios.get(`/api/scanning-point/gmt-data?qrCode=${qrData}`)
                .then(resQrData => {
                    handleGmtData(resQrData.data.data);
                })
                .catch(err => {
                    hotToast.error(err.response.data || "Something went wrong")
                })
                .finally(() => {
                    handleClear();
                });
        }
    };

    useEffect(() => {
        fetchDataFromDatabase();
    }, [qrData]);

    const handleClear = () => {
        toggleDialog();
        setQrData('');
        router.refresh();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => toggleDialog()}
                    className="h-12 w-full text-lg rounded-lg"
                >
                    <QrCode className="-ml-2"/>
                    Scan QR
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                {/* QR input listener */}
                <input 
                    ref={inputRef}
                    type="text"
                    onKeyDown={handleKeyPress}
                    aria-hidden="true"
                    className='opacity-0 absolute top-[-1000]'
                />

                {isOpen &&
                    <LoadingScanQR />
                }

                <DialogFooter>
                    <div className="mt-4 mb-2 flex gap-6">
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6" 
                            onClick={handleClear}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GmtQcQrScanningDialogModel