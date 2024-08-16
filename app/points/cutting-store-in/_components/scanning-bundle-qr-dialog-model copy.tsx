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
import BundleDataPreviewTable from "@/components/scanning-point/bundle-data-preview-table";
import { fetchBundleDataFromServer } from "@/actions/fetch-bundle-data-from-server";
import { storeBundleData } from "@/actions/store-bundle-data";
import { storeBundleDataUsingQuery } from "@/actions/store-bundle-data-using-query";

interface ScanningBundleQRDialogModelProps {
    userEmail: string;
}

const ScanningBundleQRDialogModel = ({
    userEmail
}: ScanningBundleQRDialogModelProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [qrData, setQrData] = useState('');
    const [bundleData, setBundleData] = useState<BundleDataType | null>(null);

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

    const fetchData = async () => {
        if (qrData) {
            const response: ResponseBundleDataType = await fetchBundleDataFromServer(qrData);
            
            if (response.success === false) {
                toast({
                    title: "Ha-meem factory Server is not response! please try again later.",
                    variant: "error"
                });
                setIsScanning(false);
                return;
            }

            if (response.data !== null) {
                setBundleData(response.data[0]);
            } else {
                toast({
                    title: "Bundle data not found! Please check the QR code and try again.",
                    variant: "error"
                });
            }
            setIsScanning(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [qrData]);

    const handleSave = async () => {
        setIsSaving(true);

        if (bundleData) {
            console.log("bundleData:", bundleData);
            const response: StoreBundleFunctionResponseType = await storeBundleDataUsingQuery(bundleData, userEmail);
            if (response.success === false) {
                toast({
                    title: response.message,
                    variant: "error"
                });
            } else {
                toast({
                    title: "Bundle data saved successfully!",
                    variant: "success"
                });
            }
            setIsSaving(false);
            handleClear();
            
            // await axios.post(`/api/scanning-point/bundle-data?email=${userEmail}`, bundleData)
            //     .then(() => {
            //         toast({
            //             title: "Saved bundle data!",
            //             variant: "success"
            //         });
            //     })
            //     .catch(error => {
            //         toast({
            //             title: error.response.data || "Something went wrong",
            //             variant: "error"
            //         });
            //     })
            //     .finally(() => {
            //         setIsSaving(false);
            //         handleClear();
            //     });
        }
    }

    const handleClear = () => {
        setBundleData(null);
        setIsOpen(false);
        setQrData('');
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
                            Preview the Bundle QR Data
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            Please verify the data. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                }

                {isScanning &&
                    <LoadingScanQR />
                }

                {!isScanning &&
                    <BundleDataPreviewTable 
                        bundleBarcode={bundleData?.bundleBarcode}
                        bundleNo={bundleData?.bundleNo}
                        color={bundleData?.color}
                        quantity={bundleData?.quantity}
                        startPly={bundleData?.startPly}
                        endPly={bundleData?.endPly}
                        cuttingNo={bundleData?.cuttingNo}
                        size={bundleData?.size}
                        buyerName={bundleData?.buyerName}
                        patternNo={bundleData?.patternNo ? bundleData?.patternNo : ""}
                        po={bundleData?.po ? bundleData?.po : []}
                    />
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
                        {!isScanning && bundleData &&
                            <Button
                                className="flex gap-2 pr-5 min-w-32 text-base"
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

export default ScanningBundleQRDialogModel