"use client"

import { useState } from "react";
import axios from "axios";
import { Plus, Rss } from "lucide-react";

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
import NoDataFound from "@/components/scanning-point/no-data-found";
import ReadRFIDButton from "./read-rfid-button";

interface ReadingRFIDDialogModelProps {
    handleRfidTag: (tag: string) => void;
    isThisFinishingLine?: boolean;
}

const ReadingRFIDDialogModel = ({
    handleRfidTag,
    isThisFinishingLine
}: ReadingRFIDDialogModelProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [rfidTag, setRfidTag] = useState<string>();

    const handleOpenModel = async () => {
        setIsOpen(true);
        setIsScanning(true);
        try {
            // await axios.post(`${LOCAL_SERVER_URL}/rfid`)
            //     .then(res => {
            //         qrCode = res.data.rfidTag;
            //     })
            //     .catch((err: Error) => {
            //         console.error("AXIOS_ERROR", err.message);
            //     });
            setRfidTag("e280699500005014cca73586");
            setIsScanning(false);
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
        }
    };

    const handleSave = () => {
        if (rfidTag) {
            handleRfidTag(rfidTag);
        }
        setRfidTag("");
        setIsOpen(false);
    }

    const handleCancel = () => {
        setIsOpen(false);
        setRfidTag("");
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                {isThisFinishingLine ?
                    <div className="mt-56">
                        <ReadRFIDButton handleOnClick={handleOpenModel}/>
                    </div>
                :
                    <Button
                        onClick={handleOpenModel}
                        className="h-12 w-full text-lg rounded-lg"
                    >
                        <Rss className="-ml-2"/>
                        Read RFID
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                {!isScanning &&
                    <DialogHeader className="mt-2">
                        <DialogTitle>
                            Preview the RFID
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            Please verify the RFID tag. Click save if you are done.
                        </DialogDescription>
                    </DialogHeader>
                }

                {isScanning &&
                    <LoadingScanQR />
                }

                {!isScanning &&
                    <>
                        { rfidTag ? 
                            <p className="mt-4 text-2xl tracking-wider font-medium text-slate-800 bg-slate-100 py-4 px-6 rounded-lg border">{rfidTag}</p> :
                            <NoDataFound />
                        }
                    </>
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
                        {!isScanning && rfidTag &&
                            <Button
                                className="flex gap-2 pr-5 min-w-32 text-base"
                                onClick={handleSave}
                            >
                                <Plus className="w-5 h-5" />
                                Save
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReadingRFIDDialogModel