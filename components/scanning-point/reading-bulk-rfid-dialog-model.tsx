"use client"

import { useState } from "react";
import { Check } from "lucide-react";

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
import NoDataFound from "@/components/scanning-point/no-data-found";
import ReadRFIDButton from "@/components/scanning-point/read-rfid-button";
import { readBulkRFIDTags } from "@/actions/read-bulk-rfid-tags-2";
import LoadingReadRFID from "@/components/scanning-point/loading-read-rfid";

interface ReadingBulkRFIDDialogModelProps {
    handleRfidTags: (tags: string[]) => void;
}

const ReadingBulkRFIDDialogModel = ({
    handleRfidTags
}: ReadingBulkRFIDDialogModelProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [rfidTags, setRfidTags] = useState<string[]>([])

    const handleOpenModel = async () => {
        setIsOpen(true);
        setIsScanning(true);
        try {
            // const readTags = await readBulkRFIDTags(setRfidTags);
            // console.log("TAGS", readTags);
            // setRfidTags(readTags);
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

    const handleStopReading = () => {
        // stopReading();
        setIsScanning(false);
    }

    const handleUpdate = () => {
        if (rfidTags.length > 0) {
            handleRfidTags(rfidTags);
        }
        setRfidTags([])
        setIsOpen(false);
    }

    const handleCancel = () => {
        setIsOpen(false);
        setRfidTags([])
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <div className="mt-56">
                    <ReadRFIDButton handleOnClick={handleOpenModel}/>
                </div>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                {rfidTags.length > 0 &&
                    <DialogHeader className="mt-2">
                        <DialogTitle>
                            Preview the RFID
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            Please verify the RFID tag. Click save if you are done.
                        </DialogDescription>
                    </DialogHeader>
                }

                {isScanning && rfidTags.length === 0 &&
                    <LoadingReadRFID />
                }

                <>
                    { rfidTags.length > 0 ? 
                        <div className="mt-4 bg-slate-100 py-4 pl-8 pr-4 rounded-lg border max-h-96 overflow-y-auto">
                            <ol className="list-decimal space-y-2">
                                {rfidTags.map((tag) => (
                                    <li 
                                        key={tag}
                                        className="py-2 px-4 bg-slate-200 rounded-full text-slate-700 hover:bg-slate-300 hover:text-slate-900"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ol>
                        </div> :
                        <>
                            {!isScanning && <NoDataFound /> }
                        </>
                    }
                </>

                <DialogFooter>
                    <div className="mt-4 mb-2 flex gap-6">
                        <Button 
                            variant='outline' 
                            className="flex gap-2 px-6" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        {!isScanning && rfidTags.length > 0 &&
                            <Button
                                className="flex gap-2 pr-5 min-w-40 text-base"
                                onClick={handleUpdate}
                            >
                                <Check className="-ml-2 w-5 h-5" />
                                Update
                            </Button>
                        }
                        {isScanning && rfidTags.length > 0 &&
                            <Button 
                                variant='destructive' 
                                className="flex gap-2 px-6" 
                                onClick={handleStopReading}
                            >
                                Stop Reading
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReadingBulkRFIDDialogModel