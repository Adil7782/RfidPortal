"use client"

import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';
import { Defect } from "@prisma/client";

import QCSubmitDialogModel from "@/components/scanning-point/qc/qc-submit-dialog-model";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductQcRfidDetails from "@/components/scanning-point/qc/product/product-qc-rfid-details";
import ProductQcRfidReadingDialogModel from "./product-qc-rfid-reading-dialog-model";

interface ProductQCDefectsSectionProps {
    part: string;
    obbSheetId: string
    qcPointId: string | undefined;
    defects: Defect[] | undefined;
}

type OperationDataType = {
    operationId: string;
    operators: OperatorsForOperationResType;
    selectedOperatorId: string;
    defects: string[];
}

const ProductQCDefectsSection = ({
    part,
    obbSheetId,
    qcPointId,
    defects
}: ProductQCDefectsSectionProps) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [productData, setProductData] = useState<ProductDataForRFIDType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDefects, setSelectedDefects] = useState<string[]>([]);

    const toggleDialog = () => setIsDialogOpen(prev => !prev);

    const handleRfidData = (data: ProductDataForRFIDType) => setProductData(data);

    const handleToggleDefect = (defectId: string) => {
        setSelectedDefects(prev => 
            prev.includes(defectId) ? prev.filter(id => id !== defectId) : [...prev, defectId]
        );
    }

    const hasDefects: boolean = selectedDefects.length > 0;

    const handleSubmit = async (status: string) => {
        setIsSubmitting(true);

        try {
            if (productData && qcPointId) {
                const payload: QCPayloadDataType = {
                    productId: productData.id,
                    qcPointId: qcPointId,
                    part: part,
                    obbSheetId: obbSheetId,
                    qcStatus: status,
                    defects: selectedDefects,
                };

                await axios.post(`/api/scanning-point/product/qc`, payload);
                hotToast.success("Save the QC status");
            } else {
                throw new Error("Required data missing");
            }
        } catch (error: any) {
            hotToast.error(error.response?.data || "Something went wrong");
        } finally {
            router.refresh();
            setProductData(null);
            setSelectedDefects([]);
            setIsSubmitting(false);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className='flex space-x-4'>
            <div className={productData ? 'w-5/6' : 'w-full'}>
                {productData ?
                    <div className="flex w-full border bg-slate-100 rounded-lg">
                        <div className="w-full">
                            <ScrollArea className='h-[720px]'>
                                <div className='grid grid-cols-3 gap-3 p-3'>
                                    {defects?.map((defect) => (
                                        <div
                                            key={defect.id}
                                            className={cn(
                                                "text-sm py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-pointer rounded-sm border transition-all",
                                                selectedDefects.includes(defect.id)
                                                    ? "bg-orange-600 text-white border-orange-600 hover:opacity-85"
                                                    : "text-slate-800 bg-[#0980D4]/10 border-[#0980D4]/20 hover:bg-[#0980D4]/20 hover:border-[#0980D4]/50"
                                            )}
                                            onClick={() => handleToggleDefect(defect.id)}
                                        >
                                            {defect.name}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                    :
                    <div className='bg-slate-50 p-14 rounded-lg'>
                        <div
                            className="h-[420px] flex flex-col justify-center items-center bg-slate-100/80 text-slate-500 rounded-lg border border-[#0980D4]/50 border-dashed cursor-pointer"
                            onClick={toggleDialog}
                        >
                            <Image src='/images/scanning-files.gif' alt="Scanning" width={600} height={200} className="mt-2 w-3/5 rounded-md" />
                            <p className="absolute bg-white/50 px-2 py-1 rounded-md mt-2 font-semibold text-2xl text-[#0980D4]">🫵 Press here to read RFID</p>
                        </div>
                    </div>
                }
            </div>
            <div className={cn('w-1/6 space-y-4', !productData && 'hidden')}>
                {!productData ?
                    <ProductQcRfidReadingDialogModel
                        isOpen={isDialogOpen}
                        toggleDialog={toggleDialog}
                        handleRfidTag={handleRfidData}
                    />
                    :
                    <>
                        <QCSubmitDialogModel
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isQcStatusPass={!hasDefects}
                        />
                        <ProductQcRfidDetails
                            rfid={productData.rfid}
                            color={productData.color}
                            shade={productData.shade}
                            size={productData.size}
                            styleNo={productData.styleNo}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default ProductQCDefectsSection