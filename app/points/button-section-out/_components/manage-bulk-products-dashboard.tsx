"use client"

import axios from "axios";
import { useState } from "react";
import { Loader2, Rss, Zap } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { readBulkRFIDTags, stopReading } from "@/actions/read-bulk-rfid-tags-2";
import Image from "next/image";
import { fetchProductsByRfids } from "@/actions/fetch-products-by-rfids";
import RfidProductDetailsTable from "@/components/scanning-point/rfid-product-details-table";
import { cn } from "@/lib/utils";

const ManageBulkProductDashboard = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [rfidTags, setRfidTags] = useState<string[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDataForRFIDType[]>([]);

    const sampleRfids = [
        "e28069150000501e97872e9f",
        "e28069150000401e96416936",
        "e28069150000501e9646dd48",
        "e28069150000401e97842498",
        "e28069150000501e96447c48",
        "e28069150000401e978941b2",
        "e28069150000600b3dd198a0",
        "e28069150000401e96b6d03f",
        "e28069150000501e964411da",
        "e28069150000401e4394e0a2"
    ];

    const handleReadRfidTags = async () => {
        setIsScanning(true);
        try {
            // const readTags = await readBulkRFIDTags(setRfidTags);
            if (true) {
                // console.log("TAGS", readTags);
                setRfidTags(sampleRfids);
                const productData = await fetchProductsByRfids(sampleRfids);
                setProductDetails(productData);
                console.log("DATA", productData);
            }
        } catch (error: any) {
            hotToast.error(error.response?.data || "Something went wrong");
        }
    };

    const handleStopReading = () => {
        stopReading();
        setIsScanning(false);
    }

    const handleUpdate = async () => {
        setIsUpdating(true);

        const data = {
            pointNo: 10,
            // rfidTags: tags,
        }

        await axios.put('/api/scanning-point/product/update', data)
            .then(data => {
                console.log("Successfully updated", data);
                hotToast.success("Successfully updated");
            })
            .catch(error => {
                hotToast.error(error.response?.data || "Something went wrong");
            })
            .finally(() => {
                handleStopReading();
                setIsUpdating(false);
                setRfidTags([]);
                setProductDetails([]);
                window.location.reload();
            });
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
                            <Button onClick={handleStopReading} variant="destructive" className="mt-4 w-full hover:border h-12">
                                Stop Reading
                            </Button>
                        </div>
                        :
                        <button
                            onClick={() => { handleReadRfidTags(); setIsScanning(true); }}
                            className="w-full h-20 flex justify-center items-center gap-4 primary-bg text-white font-medium text-2xl rounded-lg"
                        >
                            <Rss className="w-8 h-8" />
                            Read RFID Tags
                        </button>
                    }
                </div>
                <Separator />

                {/* Left Bottom */}
                <div className='p-4 space-y-4'>
                    {true &&
                        <div className="flex justify-between items-center bg-green-200/30 p-4 rounded-lg text-green-600">
                            <p className="ml-6 text-lg">RFIDs Count</p>
                            <p className="p-4 min-w-20 text-center bg-green-600 rounded-md border border-green-500 text-5xl font-semibold text-green-100">
                                {rfidTags.length}
                            </p>
                        </div>
                    }
                    <div className='p-4 space-y-4 bg-slate-100 rounded-md'>
                        <div className='flex justify-between items-center font-medium'>
                            <p className="text-slate-800">No. of products updated:</p>
                            <p className="text-slate-600">999</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className='w-2/3 p-4 flex flex-col justify-between items-end'>
                {rfidTags.length > 0 ?
                    <>
                        {productDetails.length > 0 ?
                            <RfidProductDetailsTable productDetails={productDetails} />
                            :
                            <div className="h-[172px] w-full bg-slate-100 flex flex-col justify-center items-center">
                                <Loader2 className="animate-spin text-gray-500 w-9 h-9" />
                                <p className="text-sm mt-2">Fetching product details...</p>
                            </div>
                        }
                    </>
                    :
                    <div className="h-[300px] w-full bg-slate-100 flex justify-center items-center">
                        <p className="text-center text-gray-500">Please scan Bundles</p>
                    </div>
                }
                {productDetails.length > 0 &&
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                handleStopReading();
                                setRfidTags([]);
                                setProductDetails([]);
                                window.location.reload();
                            }}
                            variant="outline"
                            className="px-12 mt-4 h-12 text-base text-slate-600"
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            className="px-12 mt-4 h-12 text-base"
                        >
                            <Zap className={cn("", isUpdating && "hidden")} />
                            <Loader2 className={cn("animate-spin hidden", isUpdating && "flex")} />
                            Save
                        </Button>
                    </div>
                }
            </div>
        </section>
    )
}

export default ManageBulkProductDashboard