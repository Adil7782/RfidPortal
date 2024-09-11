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

interface CuttingStoreScanningPanelProps {
    bundleCount: number;
}

type UserSelectionDataType = {
    po?: string;
    lineId?: string;
    lineName?: string;
}

const UNIT_DETAILS = [
    "AGL Unit 01",
    "AGL Unit 02",
    "AGL Unit 03",
    "AGL Unit 04",
    "AGL Unit 05"
]

const CuttingStoreScanningPanel = ({
    bundleCount
}: CuttingStoreScanningPanelProps) => {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [bundleData, setBundleData] = useState<SchemaBundleDataType | null>(null);
    const [poductionLines, setpoductionLines] = useState<ProductionLineDetailsType[]>([]);
    const [selectedData, setSelectedData] = useState<UserSelectionDataType>({ po: "", lineId: "", lineName: "" });

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
        const response: SchemaBundleDataType | null = await fetchBundleDataFromDB(qrCode);

        if (response) {
            setBundleData(response);
            setIsScanning(false);
            if (response.unitName) {
                const lines = await fetchProductionLinesForUnit(response.unitName);
                setpoductionLines(lines);
            } else {
                hotToast.error("Unit name is not found, You need to select the Unit!");
            }
        } else {
            hotToast.error("Bundle data not found! Please check the QR code and try again.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (qrCode) {
            fetchData();
        } else {
            inputRef.current?.focus();
        }
    }, [qrCode]);

    const handleSelectUnit = async (unitName: string) => {
        setIsLoading(true);
        const lines = await fetchProductionLinesForUnit(unitName);
        if (lines.length > 0) {
            setpoductionLines(lines);
        } else {
            hotToast.error("Production lines are not found for this Unit!");
        }
        setIsLoading(false);
    }

    const handleUpdate = async () => {
        if (qrCode && selectedData.po && selectedData.lineId && selectedData.lineName) {
            setIsUpdating(true);

            await axios.put(`/api/scanning-point/bundle-data/update?qrCode=${qrCode}`, selectedData)
                .then((res) => {
                    hotToast.success("Bundle updated successfully!");
                })
                .catch(error => {
                    hotToast.error(error.response.data || "Something went wrong");
                })
                .finally(() => {
                    setIsUpdating(false);
                    handleStop();
                });
        } else {
            hotToast.error("Update failed! Please try again.");
            router.refresh();
        }
        setIsScanning(true);
    }

    const handleStop = () => {
        setQrCode('');
        setBundleData(null);
        setSelectedData({ po: "", lineId: "", lineName: "" });
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
                {bundleData &&
                    <>
                        <Separator />
                        <div className='p-4 space-y-4'>
                            <BundleQrDetails data={bundleData} />
                        </div>
                    </>
                }
            </div>

            {/* Right */}
            <div className='w-2/3'>
                {bundleData ?
                    <div className="flex flex-col items-end">
                        <h1 className="w-full text-center p-4 bg-slate-100 text-lg font-medium text-slate-600">Select line to assign this bundle</h1>
                        <Separator />
                        <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                            <h2 className="text-lg font-medium w-1/4 pl-4">Select PO</h2>
                            <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                                {bundleData.poCode.length > 0 && bundleData.poCode.map(po => {
                                    if (po) {
                                        return (
                                            <button
                                                key={po}
                                                onClick={() => setSelectedData({ po: po, lineId: selectedData.lineId, lineName: selectedData.lineName })}
                                                className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.po === po && "bg-purple-600 text-white border-transparent hover:bg-purple-600/80")}
                                            >
                                                {po}
                                            </button>
                                        )
                                    } else return null;
                                })}
                            </div>
                        </div>
                        <Separator />
                        {poductionLines.length > 0 ?
                            <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                                <h2 className="text-lg font-medium w-1/4 pl-4">Select Line</h2>
                                <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                                    {poductionLines.map(line => (
                                        <button
                                            key={line.id}
                                            onClick={() => setSelectedData({ po: selectedData.po, lineId: line.id, lineName: line.name })}
                                            className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.lineId === line.id && "bg-pink-600 text-white border-transparent hover:bg-pink-600/80")}
                                        >
                                            {line.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            :
                            <div className="flex flex-row gap-x-4 px-4 py-8 w-full items-center">
                                <h2 className="text-lg font-medium w-1/4 pl-4">Select Unit</h2>
                                <div className="flex flex-wrap gap-x-2 gap-y-4 w-3/4">
                                    {UNIT_DETAILS.map(unit => (
                                        <button
                                            key={unit}
                                            onClick={() => handleSelectUnit(unit)}
                                            className={cn("py-2 px-6 bg-slate-100 border rounded-full hover:bg-slate-200 transition-colors", selectedData.lineId === unit && "bg-pink-600 text-white border-transparent hover:bg-pink-600/80")}
                                        >
                                            {unit}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }
                        {(selectedData.po && selectedData.lineId && selectedData.lineName) && (
                            <>
                                <Separator />
                                <div className="px-4 py-6">
                                    <Button
                                        disabled={isUpdating}
                                        onClick={handleUpdate}
                                        className="flex max-md:w-full gap-2 pr-5 md:w-40"
                                        variant="default"
                                    >
                                        <Zap className={cn("w-5 h-5", isUpdating && "hidden")} />
                                        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isUpdating && "flex")} />
                                        Save
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    :
                    <p className="h-full flex justify-center items-center text-slate-600 text-xl">Please scan the bundle QR</p>
                }
            </div>
        </section>
    )
}

export default CuttingStoreScanningPanel