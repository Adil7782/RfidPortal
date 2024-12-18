"use client"

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';

import { cn } from "@/lib/utils";
import { FINISHING_LINES } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import ProductQcRfidReadingDialogModel from "./product-qc-rfid-reading-dialog-model";
import ProductQcRfidDetails from "@/components/scanning-point/qc/product/product-qc-rfid-details";

interface FinishingLineSectionProps {
    pointNo: number;
}

const FinishingLineSection = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [productData, setProductData] = useState<ProductDataForRFIDType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleDialog = () => setIsDialogOpen(prev => !prev);

    const handleRfidData = (data: ProductDataForRFIDType) => setProductData(data);

    const handleSubmit = async (line: string) => {
        setIsSubmitting(true);
        if (productData) {
            const payload = {
                pointNo: 17,
                productId: productData.id,
                line,
            };
            
            try {
                await axios.patch('/api/scanning-point/product/update/assign-fline', payload);
                hotToast.success(`Garment assigned to ${FINISHING_LINES.filter(ln => ln.id === line)[0].name}`);
                router.refresh();
            } catch (error: any) {
                console.error(error);
                hotToast.error(error.response.data || "Something went wrong");
            }
        }
        setIsSubmitting(false);
    }

    return (
        <section className='flex space-x-4'>
            <div className={cn('w-1/2 space-y-4', !productData && 'hidden')}>
                {!productData ?
                    <ProductQcRfidReadingDialogModel
                        isOpen={isDialogOpen}
                        toggleDialog={toggleDialog}
                        handleRfidTag={handleRfidData}
                    />
                    :
                    <ProductQcRfidDetails
                        rfid={productData.rfid}
                        color={productData.color}
                        shade={productData.shade}
                        size={productData.size}
                        styleNo={productData.styleNo}
                    />
                }
            </div>
            <div className={productData ? 'w-1/2' : 'w-full'}>
                {productData ?
                    <div className="p-4 w-full flex border bg-slate-100 rounded-lg">
                        {!isSubmitting ?
                            <div className="w-full space-y-2">
                                {FINISHING_LINES.map((line, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSubmit(line.id)}
                                        className="py-3 px-4 w-full text-lg bg-slate-800 text-white rounded-lg"
                                    >
                                        {line.name}
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="w-full h-20 border bg-slate-200 flex justify-center items-center rounded-lg">
                                <Loader2 className="animate-spin h-10 w-10 text-slate-500" />
                            </div>
                        }
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
        </section>
    )
}

export default FinishingLineSection