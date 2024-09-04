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

interface SingleRfidReadingModelProps {
}

const SingleRfidReadingModel = ({
    
}: SingleRfidReadingModelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModel = async () => {
        try {
            const tagValue = await readSingleRFIDTag();
            if (tagValue) {
                hotToast.success(`RFID: ${tagValue}`);
                handleOpenModel();
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
                    onClick={() => { 
                        handleOpenModel(); 
                        setIsOpen(true);
                    }}
                    className="mt-16 h-12 px-8 w-fit text-lg rounded-lg"
                >
                    <Rss/>
                    Read Single RFID
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
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SingleRfidReadingModel