"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader2, QrCode, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';

import LoadingAndScanningQR from "@/components/scanning-point/loading-and-scanning-qr";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { fetchBundleDataFromDB } from "@/actions/fetch-bundle-data-from-db";
import BundleQrDetails from "./bundle-qr-details";
import { cn } from "@/lib/utils";
import { fetchProductionLinesForUnit } from "@/actions/from-eliot/fetch-production-lines-for-unit";
import CuttingStoreBundleTable from "@/components/scanning-point/cutting-store-bundle-table";
import SubmitWithPoAndLineDialogModel from "./submit-with-po-and-line-dialog-model";

interface CuttingStoreScanningPanelProps {
    bundleCount: number;
}

type UserSelectionDataType = {
    po?: string;
    lineId?: string;
    lineName?: string;
}

const CuttingStoreScanningPanel = ({
    bundleCount
}: CuttingStoreScanningPanelProps) => {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [bundleData, setBundleData] = useState<SchemaBundleDataType[]>([]);
    const [currentStyle, setCurrentStyle] = useState<string>('');
    const [unit, setUnit] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && isScanning) {
            // When 'Enter' is pressed, consider the scan complete
            event.preventDefault();  // Prevent the default 'Enter' action
            const scannedValue = event.currentTarget.value.trim();
            if (/^\d{5,6}$/.test(scannedValue)) {
                setQrCode(scannedValue);
                console.log("Scanned QR Code:", scannedValue);
            } else {
                hotToast.error("Invalid QR Code, Please try again");
            }
            event.currentTarget.value = '';  // Clear the input for the next scan
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const response: { status: number; data: SchemaBundleDataType | null; style: string } = await fetchBundleDataFromDB(qrCode);

        if (response.data) {
            if (bundleData.length === 0) {
                setCurrentStyle(response.style);
                setUnit(response.data.unitName || "");
            }

            if (!currentStyle) {
                setBundleData([...bundleData, response.data]);
                hotToast.success("The bundle scanned successfully.")
            } else if (response.style === currentStyle) {
                setBundleData([...bundleData, response.data]);
                hotToast.success("The bundle scanned successfully.")
            } else {
                hotToast.error("This bundle style does not match.")
            }
            setIsScanning(false);
        } else {
            if (response.status === 200) {
                hotToast.error("Bundle data not found! Please check the QR code and try again.");
            } else if (response.status === 409) {
                hotToast.error("Bundle is already updated");
            } else {
                hotToast.error("Something went wrong! Please try again");
            }
        }
        setIsLoading(false);
        setIsScanning(true);
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (qrCode) {
            fetchData();
        } else {
            inputRef.current?.focus();
        }
    }, [qrCode]);

    const handleStop = () => {
        setQrCode('');
        setBundleData([]);
        setIsScanning(false);
        router.refresh();
    }

    return (
        <section className='w-full mt-4 border flex flex-row'>
            {/* Left */}
            <div className='w-1/3 border-r'>
                {/* QR input listener */}
                <input
                    ref={inputRef}
                    type="text"
                    onKeyDown={handleKeyPress}
                    // disabled={bundleData !== null}
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

                {/* Left Bottom */}
                {bundleData.length > 0 &&
                    <>
                        <Separator />
                        <SubmitWithPoAndLineDialogModel
                            unit={unit}
                            poCodes={bundleData[0].poCode}
                            bundleIds={bundleData.map(data => data.id)}
                        />
                    </>
                }
            </div>

            {/* Right */}
            <div className='w-2/3'>
                {bundleData.length > 0 ? 
                    <CuttingStoreBundleTable bundleData2={bundleData} />
                    :
                    <p className="h-full flex justify-center items-center text-slate-600 text-xl">Please scan the bundle QR</p>
                }
            </div>
        </section>
    )
}

export default CuttingStoreScanningPanel