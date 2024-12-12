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
import ScanQRButton from "@/components/scanning-point/scan-qr-button";
import LoadingScanQR from "@/components/scanning-point/loading-scan-qr";

interface ScanningGmtQRDialogModelProps {
    status: string;
    isOpen: boolean;
    toggleDialog: () => void;
    handleGmtData: (data: SchemaGmtDataType) => void;
}

const ScanningGmtQRDialogModel = ({
    status,
    isOpen,
    toggleDialog,
    handleGmtData
}: ScanningGmtQRDialogModelProps) => {
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
            setQrData(scannedValue);
            console.log("Scanned QR Code:", scannedValue);
            event.currentTarget.value = '';  // Clear the input for the next scan
        }
    };

    const router = useRouter();

    const fetchDataFromDatabase = async () => {
        if (qrData) {
            await axios.get(`/api/scanning-point/gmt-data/check-is-assembled?qrCode=${qrData}`)
                .then(resQrData => {
                    handleGmtData(resQrData.data.data);
                })
                .catch(err => {
                    hotToast.error(err.response.data || "Something went wrong")
                })
                .finally(() => {
                    handleClear();
                    toggleDialog()
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
                {status === "start" ?
                    <div className="w-full py-32 flex justify-center items-center border border-[#0980D4]/50 border-dashed bg-[#0980D4]/5 rounded-lg">
                        <ScanQRButton handleOnClick={() => toggleDialog()}/>
                    </div>
                :
                    <Button
                        onClick={() => toggleDialog()}
                        className="h-12 w-48 text-lg rounded-lg"
                    >
                        <QrCode />
                        Scan QR
                    </Button>
                }
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

export default ScanningGmtQRDialogModel