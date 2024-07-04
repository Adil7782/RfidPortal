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

const ScanningBundleQRDialogModel = () => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [bundleData, setBundleData] = useState<SchemaBundleDataType | null>(null);

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
                await axios.get(`/api/scanning-point/bundle-data?qrCode=${"23124"}`)
                    .then(resQrData => {
                        setBundleData(resQrData.data.data);
                    })
                    .catch(error => {
                        toast({
                            title: error.response.data || "Something went wrong",
                            variant: "error",
                            description: (
                                <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                                    <code className="text-slate-800">
                                        ERROR: {error.message}
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
            await axios.patch(`/api/scanning-point/bundle-data/update?qrCode=${bundleData.bundleBarcode}`)
                .then(() => {
                    toast({
                        title: "Saved bundle data!",
                        variant: "success"
                    });
                })
                .catch(error => {
                    toast({
                        title: error.response.data || "Something went wrong",
                        variant: "error",
                        description: (
                            <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                                <code className="text-slate-800">
                                    ERROR: {error.message}
                                </code>
                            </div>
                        ),
                    });
                })
                .finally(() => {
                    setIsSaving(false);
                    setBundleData(null);
                    setIsOpen(false);
                    router.refresh();
                });
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
                <div className="mt-56">
                    <ScanQRButton handleOnClick={handleOpenModel}/>
                </div>
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
                        size={bundleData?.size}
                        buyerName={bundleData?.buyerName}
                        patternNo={bundleData?.patternNo}
                        poCode={bundleData?.poCode}
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