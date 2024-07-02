"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Tag, TriangleAlert, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import GmtDataPreviewTable from "@/components/scanning-point/gmt-data-preview-table";
import ReadingRFIDDialogModel from "@/components/scanning-point/reading-rfid-dialog-model";
import ScanningGmtQRDialogModel from "./scanning-gmt-qr-dialog-model";
import ScanningFilesAnimation from "./scanning-files-animation";

const ProductAssembleSection = () => {
    const { toast } = useToast();
    const [status, setStatus] = useState<string>("start");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comparisonResult, setComparisonResult] = useState<string[]>([]);
    const [frontGmtData, setFrontGmtData] = useState<SchemaGmtDataType | null>(null);
    const [backGmtData, setBackGmtData] = useState<SchemaGmtDataType | null>(null);
    const [rfidTag, setRfidTag] = useState<string>();

    const router = useRouter();

    const compareGmtData = (data1: SchemaGmtDataType, data2: SchemaGmtDataType) => {
        const mismatchedFields: string[] = [];

        if (data1.color !== data2.color) mismatchedFields.push('Color');
        if (data1.shade !== data2.shade) mismatchedFields.push('Shade');
        if (data1.size !== data2.size) mismatchedFields.push('Size');
        if (data1.styleNo !== data2.styleNo) mismatchedFields.push('Style Number');

        if (mismatchedFields.length > 0) {
            setComparisonResult(mismatchedFields);
        } else {
            setComparisonResult([]);
        }
    }

    const handleGmtData = (gmtData: SchemaGmtDataType) => {
        if (gmtData.partName === "FRONT") {
            setFrontGmtData(gmtData);
        } else if (gmtData.partName === "BACK") {
            setBackGmtData(gmtData);
        }
        setStatus("compare");
    }

    useEffect(() => {
        if (frontGmtData && backGmtData) {
            compareGmtData(frontGmtData, backGmtData);
            if (status === "compare") setStatus("rfid");
        }
    }, [frontGmtData, backGmtData, status]);
    

    const handleRfidTag = (tag: string) => {
        setRfidTag(tag);
        setStatus("finished");
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);

        if (frontGmtData && backGmtData && rfidTag) {
            const data = {
                rfid: rfidTag,
                frontGmtId: frontGmtData.id,
                backGmtId: backGmtData.id
            };
            await axios.post(`/api/scanning-point/product/create`, data)
                .then(() => {
                    toast({
                        title: "Assembled product!",
                        variant: "success"
                    });
                })
                .catch(error => {
                    toast({
                        title: error.response.data || "Something went wrong",
                        variant: "error",
                        description: (
                            <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                                <code className="text-slate-800">
                                    ERROR: {error.message}
                                </code>
                            </div>
                        ),
                    });
                })
                .finally(() => {
                    setIsSubmitting(false);
                    setFrontGmtData(null);
                    setBackGmtData(null);
                    setRfidTag("");
                    setStatus("start");
                    router.refresh();
                });
        }
    }

    return (
        <section className="mt-12 p-4 w-full h-full">
            <div className={cn("flex justify-end items-center", status === 'start' && "justify-center", status === 'rfid' || status === 'finished' && "justify-between")}>
                {rfidTag &&
                    <div className="flex justify-center items-center gap-2">
                        <Tag className="" />
                        <p className="text-xl">RFID : <span className="font-medium text-slate-700 tracking-wide text-2xl">{rfidTag}</span></p>
                    </div>
                }
                {(frontGmtData && backGmtData && rfidTag) ?
                    <Button
                        onClick={handleSubmit}
                        className="h-12 w-48 text-lg rounded-lg"
                        variant="default"
                        disabled={isSubmitting || comparisonResult?.length > 0}
                    >
                        <Zap className={cn("", isSubmitting && "hidden")} />
                        <Loader2 className={cn("animate-spin hidden", isSubmitting && "flex")} />
                        Assemble
                    </Button>
                    :
                    <>
                        {(frontGmtData && backGmtData) ?
                            <div className="w-56">
                                <ReadingRFIDDialogModel handleRfidTag={handleRfidTag} />
                            </div>
                            :
                            <ScanningGmtQRDialogModel
                                status={status}
                                handleGmtData={handleGmtData}
                            />
                        }
                    </>
                }
            </div>

            {comparisonResult.length > 0 && 
            <div className="w-full my-4 flex gap-2 py-4 px-6 bg-red-500/10 border border-orange-500 rounded-lg">
                <TriangleAlert className="text-orange-600" />
                <span className="space-x-3">{comparisonResult.map((data) => <span key={data} className="bg-orange-500/20 px-1.5 py-0.5 rounded-sm font-mono">{data}</span>)}</span> do not match, please try again!
            </div>
            }

            {(frontGmtData || backGmtData) &&
                <div className="w-full mt-8 flex gap-x-8">
                    <div className={cn("w-full bg-[#0980D4]/5 rounded-lg p-8", frontGmtData && "border border-[#0980D4]/50 ")}>
                        {frontGmtData ?
                            <GmtDataPreviewTable
                                gmtBarcode={frontGmtData?.gmtBarcode}
                                color={frontGmtData?.color}
                                shade={frontGmtData?.shade}
                                size={frontGmtData?.size}
                                styleNo={frontGmtData?.styleNo}
                                buyerName={frontGmtData?.buyerName}
                                partName={frontGmtData?.partName}
                                serialNumber={frontGmtData?.serialNumber}
                            />
                            :
                            <ScanningFilesAnimation part="Front" />
                        }
                    </div>
                    <div className={cn("w-full bg-[#0980D4]/5 rounded-lg p-8", backGmtData && "border border-[#0980D4]/50 ")}>
                        {backGmtData ?
                            <GmtDataPreviewTable
                                gmtBarcode={backGmtData?.gmtBarcode}
                                color={backGmtData?.color}
                                shade={backGmtData?.shade}
                                size={backGmtData?.size}
                                styleNo={backGmtData?.styleNo}
                                buyerName={backGmtData?.buyerName}
                                partName={backGmtData?.partName}
                                serialNumber={backGmtData?.serialNumber}
                            />
                            :
                            <ScanningFilesAnimation part="Back" />
                        }
                    </div>
                </div>
            }
        </section>
    )
}

export default ProductAssembleSection