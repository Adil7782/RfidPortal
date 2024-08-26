"use client"

import { useState } from "react";
import { Loader2, Send, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QCSubmitDialogModelProps {
    handleSubmit: (status: string) => void;
    isSubmitting: boolean;
    isQcStatusPass: boolean;
}

const QCSubmitDialogModel = ({
    handleSubmit,
    isSubmitting,
    isQcStatusPass
}: QCSubmitDialogModelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleOnClick = () => {
        if (isQcStatusPass) {
            handleSubmit("pass");
        } else {
            setIsOpen(true)
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOnClick}
                    className="h-24 w-full text-lg rounded-lg"
                    disabled={isSubmitting}
                >
                    <Send className={cn("-ml-2 flex", isSubmitting && "hidden")} />
                    <Loader2 className={cn("animate-spin ml-2 hidden", isSubmitting && "flex")}/>
                    Submit QC
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                <DialogHeader>
                    <DialogTitle>
                        Quality status of the product
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Please check the quality and click it if you are verified.
                    </DialogDescription>
                </DialogHeader>

                <div
                    className="absolute right-0 mr-6 mt-6 p-1.5 rounded-md opacity-70 hover:bg-slate-100 hover:opacity-100"
                    onClick={handleCancel}
                >
                    <X className="w-5 h-5"/>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-8">
                    <button 
                        className="h-36 flex justify-center items-center text-2xl font-semibold text-white rounded-lg bg-orange-600 tracking-wider hover:bg-orange-500 transition-all"
                        onClick={() => {
                            handleSubmit("rework");
                            setIsOpen(false);
                        }}
                    >
                        REWORK
                    </button>
                    <button 
                        className="h-36 flex justify-center items-center text-2xl font-semibold text-white rounded-lg bg-red-600 tracking-wider hover:bg-red-500 transition-all"
                        onClick={() => {
                            handleSubmit("reject");
                            setIsOpen(false);
                        }}
                    >
                        REJECT
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default QCSubmitDialogModel