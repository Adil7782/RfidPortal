"use client"

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Rss, Zap } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { readBulkRFIDTags } from "@/actions/read-bulk-rfid-tags";
import RfidProductDetailsTable from "@/components/scanning-point/rfid-product-details-table";
import { cn } from "@/lib/utils";
import { fetchProductsByRfids } from "@/actions/fetch-products-by-rfids";

const ManageBulkProductDashboard = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rfidTags, setRfidTags] = useState<string[]>([]);
    const [missingRfidTags, setMissingRfidTags] = useState<string[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDataForRFIDType[]>([]);
    const [notValidProducts, setNotValidProducts] = useState<BulkGateUpdateResponseType["notValid"]>(undefined);
    const [alreadyExistProducts, setAlreadyExistProducts] = useState<BulkGateUpdateResponseType["exist"]>(undefined);

    const handleReadRfidTags = async () => {
        setIsScanning(true);
        const timeoutId = setTimeout(() => {
            setIsScanning(false);  // Turn off scanning after 30 seconds automatically
            console.log('Automatically stopped scanning after 60 seconds');
        }, 60000);

        try {
            const readTags = await readBulkRFIDTags(setRfidTags);
            console.log("TAGS", readTags);
            setRfidTags(readTags);
        } catch (error: any) {
            hotToast.error(error.response?.data || "Something went wrong");
        } finally {
            // clearTimeout(timeoutId);  // Clear the timeout if the scanning completes or fails before 30 seconds
            // setIsScanning(false);
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);

        if (productDetails.length > 0) {
            const data = {
                pointNo: 20,
                rfidTags: productDetails.map(tag => tag.rfid),
            }

            try {
                const result = await axios.put('/api/scanning-point/bulk-gate/update/pack-in', data);
                if (result.status === 200) {
                    const res: BulkGateUpdateResponseType = result.data;
                    hotToast.success(res.message);
                    console.log("Successfully updated", res.message);
                    if (res.notValid) {
                        setNotValidProducts(res.notValid);
                        hotToast(res.notValid.message, {
                            icon: '🚫'
                        });
                    }
                    if (res.exist) {
                        setAlreadyExistProducts(res.exist);
                        hotToast(res.exist.message, {
                            icon: '⚠️'
                        });
                    }
                    if (!res.exist && !res.notValid) {
                        setRfidTags([]);
                        setProductDetails([]);
                        // Set the timeout for the reloading
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }
            } catch (error: any) {
                hotToast.error(error.response?.data || "Something went wrong");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } finally {
                // handleStopReading();
                setIsUpdating(false);
            }
        }
    };

    const handleFetchGarmentsData = async () => {
        setIsLoading(true);
        if (rfidTags.length > 0) {
            const productData = await fetchProductsByRfids(rfidTags);
            setProductDetails(productData);

            // Find all missing rfid tags
            if (productData.length > 0) {
                const fetchedRfids = productData.map(product => product.rfid);
                const missingRfids = rfidTags.filter(rfid => !fetchedRfids.includes(rfid));
                setMissingRfidTags(missingRfids);
            }
        }
        setIsLoading(false);
    };

    return (
        <section className='w-full border flex flex-row'>
            <div className='w-1/3 border-r'>
                {/* Left Top */}
                <div className="p-4">
                    {isScanning ?
                        <div>
                            <div>
                                <Image
                                    src='/images/scanning-files.gif'
                                    alt="scanning qr"
                                    width={600}
                                    height={200}
                                    className="w-full rounded-md border py-6"
                                />
                                <div className="-mt-8 flex items-center justify-center gap-2 text-slate-500">
                                    <div className="animate-ping animate-ping-delayed w-3 h-3 bg-[#ea8460] rounded-full" />
                                    Reading...
                                </div>
                            </div>
                            {/* <Button onClick={handleStopReading} variant="destructive" className="mt-4 w-full hover:border h-12">
                                Cancel Reading
                            </Button> */}
                        </div>
                        :
                        <button
                            onClick={() => { handleReadRfidTags(); setIsScanning(true); }}
                            disabled={productDetails.length > 0}
                            className="w-full h-20 flex justify-center items-center gap-4 primary-bg text-white font-medium text-2xl rounded-lg"
                        >
                            <Rss className="w-8 h-8" />
                            Read GMT
                        </button>
                    }
                </div>
                <Separator />

                {/* Left Bottom */}
                <div className='p-4 space-y-4'>
                    {true &&
                        <div className="flex justify-between items-center bg-green-200/30 p-4 rounded-lg text-green-600">
                            <p className="ml-6 text-lg">GMT Count</p>
                            <p className="p-4 min-w-20 text-center bg-green-600 rounded-md border border-green-500 text-5xl font-semibold text-green-100">
                                {rfidTags.length}
                            </p>
                        </div>
                    }
                    {/* <div className='p-4 space-y-4 bg-slate-100 rounded-md'>
                        <div className='flex justify-between items-center font-medium'>
                            <p className="text-slate-800">No. of GMT updated:</p>
                            <p className="text-slate-600">999</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Right */}
            <div className='w-2/3 p-4 flex flex-col justify-between items-end'>
                {rfidTags.length === 0 ?
                    <div className="h-[300px] w-full bg-slate-100 flex justify-center items-center">
                        <p className="text-center text-gray-500">Please scan Bundles</p>
                    </div>
                    :
                    <div className="w-full">
                        {(!isLoading && productDetails.length === 0) && (
                            <Button
                                variant="primaryOutline"
                                className="mt-6 w-full text-xl h-14 font-semibold"
                                onClick={handleFetchGarmentsData}
                            >
                                Load Garment Details
                            </Button>
                        )}
                        {isLoading &&
                            <div className="h-[172px] w-full bg-slate-100 flex flex-col justify-center items-center">
                                <Loader2 className="animate-spin text-gray-500 w-9 h-9" />
                                <p className="text-sm mt-2">Fetching product details...</p>
                            </div>
                        }
                        {(!isLoading && productDetails.length > 0) &&
                            <>
                                <RfidProductDetailsTable
                                    productDetails={productDetails}
                                    notValidProducts={notValidProducts}
                                    alreadyExistProducts={alreadyExistProducts}
                                />
                                {missingRfidTags.length > 0 &&
                                    <div className="w-full mt-6">
                                        <Separator />
                                        <h2 className="mt-2 font-semibold text-lg text-red-600">Missing RFID tags</h2>
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            {missingRfidTags.map(missingRfid => (
                                                <p key={missingRfid} className="p-1.5 text-[17px] bg-red-200 text-center rounded-sm font-medium text-red-900 line-clamp-1">{missingRfid}</p>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                }
                <div className="flex gap-4">
                    {rfidTags.length > 0 &&
                        <Button
                            onClick={() => {
                                setRfidTags([]);
                                setProductDetails([]);
                                window.location.reload();
                            }}
                            variant="outline"
                            className="px-12 mt-4 h-12 text-base text-slate-600"
                        >
                            Clear
                        </Button>
                    }
                    {productDetails.length > 0 &&
                        <Button
                            onClick={handleUpdate}
                            className="px-12 mt-4 h-12 text-base"
                            // disabled={rfidTags.length > 0}
                        >
                            <Zap className={cn("", isUpdating && "hidden")} />
                            <Loader2 className={cn("animate-spin hidden", isUpdating && "flex")} />
                            Confirm
                        </Button>
                    }
                </div>
            </div>
        </section>
    )
}

export default ManageBulkProductDashboard
