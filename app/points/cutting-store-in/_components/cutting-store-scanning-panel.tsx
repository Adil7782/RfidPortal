"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';

import LoadingAndScanningQR from "../../../../components/scanning-point/loading-and-scanning-qr";
import CuttingStoreBundleTable from "../../../../components/scanning-point/cutting-store-bundle-table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchBundleDataFromServer } from "@/actions/fetch-bundle-data-from-server";

interface CuttingStoreScanningPanelProps {
    userEmail: string;
    bundleCount: number;
}

type BundleTableDataType = {
    qrCode: string;
    bundleNo: string;
    color: string;
    cuttingNo: string;
    size: string;
    buyerName: string;
    startPly: string;
    endPly: string;
    patternNo: string | null;
    quantity: string;
}

const CuttingStoreScanningPanel = ({
    userEmail,
    bundleCount
}: CuttingStoreScanningPanelProps) => {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [updatedQrCode, setUpdatedQrCode] = useState('');
    const [bundleData, setBundleData] = useState<BundleTableDataType[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
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
        if (qrCode) {
            const response: ResponseBundleDataType = await fetchBundleDataFromServer(qrCode);

            if (response.success === false) {
                hotToast.error("Ha-meem's factory Server is not response! please try again later.")
                setIsScanning(false);
                return;
            }

            if (response.data !== null) {
                setIsLoading(true);
                const formattedData: BundleTableDataType = {
                    qrCode: response.data[0].bundleBarcode,
                    bundleNo: response.data[0].bundleNo,
                    color: response.data[0].color,
                    cuttingNo: response.data[0].cuttingNo,
                    size: response.data[0].size,
                    buyerName: response.data[0].buyerName,
                    startPly: response.data[0].startPly,
                    endPly: response.data[0].endPly,
                    patternNo: response.data[0].patternNo,
                    quantity: response.data[0].quantity
                };

                // const res: StoreBundleFunctionResponseType = await storeBundleDataUsingQuery(response.data[0], userEmail);
                await axios.post(`/api/scanning-point/bundle-data?email=${userEmail}`, response.data[0])
                    .then((res) => {
                        hotToast.success("Bundle data saved successfully!");
                        setUpdatedQrCode(res.data.bundleData.bundleBarcode);
                        setBundleData([formattedData, ...bundleData]);
                    })
                    .catch(error => {
                        hotToast.error(error.response.data || "Something went wrong");
                    });
            } else {
                hotToast.error("Bundle data not found! Please check the QR code and try again.")
            }
            setQrCode('');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        inputRef.current?.focus();
    }, [qrCode]);

    const handleStop = () => {
        setQrCode('');
        setUpdatedQrCode('');
        setBundleData([]);
        setIsScanning(false);
        router.refresh();

    }

    return (
        <section className='w-full border flex flex-row'>
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
                        <div className='flex justify-between items-center font-medium'>
                            <p className="text-slate-800">No. of scanned Bundles</p>
                            <p className="text-slate-600">{bundleCount + bundleData.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className='w-2/3 p-4'>
                {bundleData.length > 0 ?
                    <>
                        <CuttingStoreBundleTable bundleData={bundleData} />
                        <Button
                            onClick={handleStop}
                            variant="outline"
                            className="px-12 mt-4"
                        >
                            Clear
                        </Button>
                    </>
                    :
                    <p className="h-full flex justify-center items-center text-slate-600 text-xl">Please scan the bundle QR</p>
                }
            </div>
        </section>
    )
}

export default CuttingStoreScanningPanel