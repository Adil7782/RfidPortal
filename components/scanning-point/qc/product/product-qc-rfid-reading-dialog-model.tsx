"use client"

import { Rss } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingReadRFID from "@/components/scanning-point/loading-read-rfid";
import { readSingleRFIDTag } from "@/actions/read-single-rfid-tag";
import { fetchProductByRfid } from "@/actions/fetch-product-by-rfid";

interface ProductQcRfidReadingDialogModelProps {
    isOpen: boolean;
    toggleDialog: () => void;
    handleRfidTag: (data: ProductDataForRFIDType) => void;
}

const ProductQcRfidReadingDialogModel = ({
    isOpen,
    toggleDialog,
    handleRfidTag
}: ProductQcRfidReadingDialogModelProps) => {
    const [tempTagValue, setTempTagValue] = useState<string>('');

    const handleOpenModel = async () => {
        try {
            const tagValue = await readSingleRFIDTag();
            if (tagValue) {
                if (tagValue !== tempTagValue) {
                    setTempTagValue(tagValue);
                    const productData = await fetchProductByRfid(tagValue);
                    if (!productData) {
                        hotToast.error("Sorry! This garment is not recorded at Assembly point.");
                        handleOpenModel();
                    } else {
                        handleRfidTag(productData);
                        hotToast.success("Assembled product found for this RFID");
                        setTempTagValue("");
                        toggleDialog();
                    }
                } else {
                    handleOpenModel();
                }
            }
        } catch (error: any) {
            hotToast.error(error.response.data || "Something went wrong")
        }
    };

    useEffect(() => {
      if (isOpen) {
        handleOpenModel();
      }
    }, [isOpen])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOpenModel}
                    className="h-12 w-full text-lg rounded-lg"
                >
                    <Rss className="-ml-2"/>
                    Read RFID
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                {isOpen &&
                    <LoadingReadRFID />
                }

                <DialogFooter>
                    <div className="mt-4 mb-2 flex gap-6">
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6" 
                            onClick={() => toggleDialog()}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProductQcRfidReadingDialogModel