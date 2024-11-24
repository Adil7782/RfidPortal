"use client"

import { Loader2, Rss } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { Product, ProductDefect } from "@prisma/client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingReadRFID from "@/components/scanning-point/loading-read-rfid";
import { readSingleRFIDTag } from "@/actions/read-single-rfid-tag";
import { fetchProductForTrackGarment } from "@/actions/fetch-product-for-track-garment";

interface ReadingGarmentRfidModelProps {
    isOpen: boolean;
    toggleDialog: () => void;
    handleRfidTag: (data: {
        product: Product;
        qc: ProductDefect[];
    }) => void;
}

const ReadingGarmentRfidModel = ({
    isOpen,
    toggleDialog,
    handleRfidTag
}: ReadingGarmentRfidModelProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModel = async () => {
        setIsLoading(true);
        toggleDialog();
        try {
            setTimeout(async () => {
                const tagValue = await readSingleRFIDTag();
                // const tagValue = "e280691500005012108441be";
                if (tagValue) {
                    const res = await fetchProductForTrackGarment(tagValue);
                    
                    if (res.status === 200 && res.data) {
                        console.log("RES", res);
                        hotToast.success("Garment product found for this RFID");
                        handleRfidTag({
                            product: res.data.product,
                            qc: res.data.qc
                        });
                        setIsLoading(false);
                        toggleDialog();
                    } else {
                        hotToast.error(res.message);
                        handleOpenModel();
                    }
                }
            }, 1500) // 1500 ms delay for reading and fetching the tag
        } catch (error: any) {
            hotToast.error(error.response.data || "Something went wrong")
            setIsLoading(false);
        }
    };
    console.log("Loading", isLoading);

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOpenModel}
                    className="h-14 w-64 text-lg rounded-lg ml-auto right-0"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <Rss className="-ml-2" />
                            Read RFID
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                <LoadingReadRFID />

                <DialogFooter>
                    <div className="mt-4 mb-2 flex gap-6">
                        <Button
                            variant='destructive'
                            className="flex gap-2 px-6 h-12 text-xl font-semibold"
                            onClick={() => toggleDialog()}
                        >
                            CANCEL
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReadingGarmentRfidModel