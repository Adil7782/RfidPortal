"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScanQRButton from "@/components/scanning-point/scan-qr-button";
import LoadingScanQR from "@/components/scanning-point/loading-scan-qr";
import QRListTable from "@/components/scanning-point/qr-list-table";

const ScanningGmtQRDialogModel = () => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [qrCodes, setQrCodes] = useState<string[]>([]);
    const [errorQrCodes, setErrorQrCodes] = useState<string[] | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [qrCodes]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // To remove the scanning status
        if (qrCodes.length === 0) {
            setIsScanning(false);
        }
        setErrorQrCodes(null);

        // Set the QR code from the input
        if (event.key === 'Enter') {
            event.preventDefault();
            const scannedValue = event.currentTarget.value.trim();
            event.currentTarget.value = '';
            if (scannedValue) {
                if (scannedValue.endsWith('B')) {
                    // Handle validation for BACK QR Codes
                    toast({
                        description: "You are scanning a back QR code, which is not allowed for this point.",
                        variant: "error"
                    });
                } else if (scannedValue.endsWith('F')) {
                    // Check if the QR code already exists in the array
                    if (!qrCodes.includes(scannedValue)) {
                        setQrCodes(current => [...current, scannedValue]);
                    } else {
                        toast({
                            variant: "error",
                            description: "This QR code has already been scanned."
                        });
                    }
                }
            }
        }
    };

    const router = useRouter();

    const handleRemoveQrCode = (index: number) => {
        setQrCodes(current => current.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const response = await axios.put('/api/scanning-point/gmt-data/update', qrCodes);
            const data = response.data;

            if (data.nonExistent) {
                setQrCodes([]);
                setErrorQrCodes(data.nonExistent);

                if (data.nonExistent.length === qrCodes.length) {
                    // All QR codes are non-existent
                    toast({
                        title: "None of the QR codes exist in the database",
                        variant: "error"
                    });
                } else {
                    // Some QR codes are non-existent
                    toast({
                        title: "Some QR codes do not exist in the database"
                    });
                }
            } else {
                // All QR codes are updated
                toast({
                    title: "Success",
                    variant: "success",
                    description: "All QR codes have been updated successfully."
                });
                handleClear();
            }
        } catch (error: any) {
            toast({
                title: "Failed to update QR codes",
                variant: "error",
                description: error.message || "An error occurred while updating QR codes."
            });
        } finally {
            setIsSaving(false);
        }
    }

    const handleClear = () => {
        setQrCodes([]);
        setIsOpen(false);
        setErrorQrCodes(null);
        setIsScanning(false);
        router.refresh();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <div className="mt-56">
                    <ScanQRButton handleOnClick={() => { setIsOpen(true); setIsScanning(true); }}/>
                </div>
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

                {!isScanning &&
                    <DialogHeader className="mt-2">
                        <DialogTitle>
                            {errorQrCodes ? "These QR codes do not exist :(" : "Garmet QR Code"}
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            {errorQrCodes ? 
                                "Please click the Scan more button, and try again" : 
                                "Please verify the code. Click save when you are done."
                            }
                        </DialogDescription>
                    </DialogHeader>
                }

                {isScanning &&
                    <LoadingScanQR />
                }

                {!isScanning &&
                    <QRListTable 
                        qrCodes={qrCodes} 
                        errorQrCodes={errorQrCodes}
                        onRemove={handleRemoveQrCode} 
                    />
                }

                <DialogFooter>
                    <div className="w-full mt-4 mb-2 flex justify-end gap-6">
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6 text-red-600" 
                            onClick={handleClear}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6" 
                            onClick={() => inputRef.current?.focus()}
                        >
                            Scan more
                        </Button>
                        {qrCodes.length > 0 && 
                            <Button
                                className="flex gap-2 pr-5 min-w-32 text-base ml-auto"
                                onClick={handleSave}
                            >
                                <Zap className={cn("w-5 h-5", isSaving && "hidden")} />
                                <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSaving && "flex")} />
                                Save
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ScanningGmtQRDialogModel