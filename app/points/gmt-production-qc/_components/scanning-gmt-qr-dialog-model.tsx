"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, QrCode } from "lucide-react";

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
import LoadingScanQR from "@/components/scanning-point/loading-scan-qr";
import GmtDataPreviewTable from "@/components/scanning-point/gmt-data-preview-table";

interface ScanningGmtQRDialogModelProps {
    handleGmtData: (data: SchemaGmtDataType) => void;
}

const ScanningGmtQRDialogModel = ({
    handleGmtData
}: ScanningGmtQRDialogModelProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [gmtData, setGmtData] = useState<SchemaGmtDataType | null>(null)

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
                await axios.get(`/api/scanning-point/gmt-data?qrCode=${"HG156231245F"}`)
                    .then(resQrData => {
                        setGmtData(resQrData.data.data);
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

    const handleConfirm = async () => {
        if (gmtData) {
            try {
                handleGmtData(gmtData);
            } catch (error: any) {
                toast({
                    title: error.message,
                    variant: "error"
                });
            } finally {
                setGmtData(null);
                setIsOpen(false);
                router.refresh();
            }
        }
    }

    const handleCancel = () => {
        setGmtData(null);
        setIsOpen(false);
        router.refresh();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOpenModel}
                    className="h-12 w-full text-lg rounded-lg"
                >
                    <QrCode className="-ml-2"/>
                    Scan QR
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                {!isScanning &&
                    <DialogHeader className="mt-2">
                        <DialogTitle>
                            Preview the GMT QR Data
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
                    <GmtDataPreviewTable 
                        gmtBarcode={gmtData?.gmtBarcode}
                        color={gmtData?.color}
                        shade={gmtData?.shade}
                        size={gmtData?.size}
                        styleNo={gmtData?.styleNo}
                        buyerName={gmtData?.buyerName}
                        partName={gmtData?.partName}
                        serialNumber={gmtData?.serialNumber}
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
                        {!isScanning && gmtData &&
                            <Button
                                className="flex gap-2 pr-5 text-base"
                                onClick={handleConfirm}
                            >
                                <Check className="w-5 h-5" />
                                Confirm
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ScanningGmtQRDialogModel