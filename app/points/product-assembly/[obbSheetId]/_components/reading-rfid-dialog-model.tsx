"use client"

import { Rss } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';
import { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { readSingleRFIDTag } from "@/actions/read-single-rfid-tag";
import LoadingReadRFID from "@/components/scanning-point/loading-read-rfid";

interface ReadingRFIDDialogModelProps {
    isOpen: boolean;
    toggleDialog: () => void;
    handleRfidTag: (tag: string) => void;
}

const ReadingRFIDDialogModel = ({
    isOpen,
    toggleDialog,
    handleRfidTag
}: ReadingRFIDDialogModelProps) => {
    const handleOpenModel = async () => {
        try {
            const tagValue = await readSingleRFIDTag();
            if (tagValue) {
                handleRfidTag(tagValue);
                hotToast.success(`RFID: ${tagValue}`);
            }
        } catch (error: any) {
            hotToast.error(error.response.data || "Something went wrong")
        } finally {
            toggleDialog();
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

export default ReadingRFIDDialogModel