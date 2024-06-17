"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOCAL_SERVER_URL } from "@/constants";
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
    const [bundleData, setBundleData] = useState<BundleDataType | null>(null);

    const router = useRouter();
    let qrCode: number;

    const handleOpenModel = async () => {
        setIsOpen(true);
        setIsScanning(true);
        try {
            // await axios.post(`${LOCAL_SERVER_URL}/qr`)
            //     .then(res => {
            //         qrCode = res.data.qrData;
            //     })
            //     .catch((err: Error) => {
            //         console.error("AXIOS_ERROR", err.message);
            //     });
            console.log("Working");
        } catch (error: any) {
            toast({
                title: "Something went wrong! Try again",
                variant: "error",
                description: (
                    <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                        <code className="text-slate-800">
                            ERROR: {error.message}
                        </code>
                    </div>
                ),
            });
        } finally {
            if (true) {
                // const resQrData = await axios.get(`/api/scanning-point/fetch-data-from-server?qrCode=${qrCode}`);
                await axios.get(`/api/scanning-point/fetch-data-from-server?qrCode=${"23123"}`)
                    .then(resQrData => {
                        if (resQrData.data.data.data) {
                            setBundleData(resQrData.data.data.data[0]);
                        }
                        if (resQrData.data.data.success === false) {
                            toast({
                                title: "Factory Server is not response! please try again later.",
                                variant: "error"
                            });
                        }
                    })
                    .catch(err => {
                        toast({
                            title: "Something went wrong! Try again",
                            variant: "error",
                            description: (
                                <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                                    <code className="text-slate-800">
                                        ERROR: {err.message}
                                    </code>
                                </div>
                            ),
                        });
                    });
            }
            setIsScanning(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);

        if (bundleData) {
            try {
                const response = await axios.post(`/api/scanning-point/bundle-data?email=${userEmail}`, bundleData);
                toast({
                    title: "Saved bundle data!",
                    variant: "success"
                });
            } catch (error: any) {
                if (error.response && error.response.status === 409) {
                    toast({
                        title: error.response.data,
                        variant: "error"
                    });
                } else {
                    toast({
                        title: "Something went wrong! Try again",
                        variant: "error",
                        description: (
                            <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                                <code className="text-slate-800">
                                    ERROR: {error.message}
                                </code>
                            </div>
                        ),
                    });
                }
            } finally {
                setIsSaving(false);
                setBundleData(null);
                setIsOpen(false);
                router.refresh();
            }
        }
    }

    const handleCancel = () => {
        setBundleData(null);
        setIsOpen(false);
        router.refresh();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <ScanQRButton handleOnClick={handleOpenModel}/>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
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
                        cuttingDate={bundleData?.cuttingDate}
                        size={bundleData?.size}
                        buyerName={bundleData?.buyerName}
                    />
                }

                <DialogFooter>
                    <div className="mt-4 mb-2 flex gap-6">
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6" 
                            onClick={handleCancel}
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