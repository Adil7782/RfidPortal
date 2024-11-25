"use client"

import { useState } from "react";
import { Product, ProductDefect } from "@prisma/client";

import ReadingGarmentRfidModel from "./_components/reading-garment-rfid-model";
import GarmentDetailsTable from "./_components/garment-details-table";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const TrackGarmentRFID = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [productDefects, setProductDefects] = useState<ProductDefect[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDialog = () => setIsOpen(prev => !prev);

    const handleRfidTag = (data: { product: Product; qc: ProductDefect[]; }) => {
        setProduct(data.product);
        setProductDefects(data.qc);
        console.log("TIMESTAMP:", data.qc.filter(defect => defect.part === "line-end").map(p => p.timestamp));
    }

    return (
        <div className='mt-12 mx-auto max-w-7xl flex flex-col'>
            {!product ? (
                <ReadingGarmentRfidModel
                    isOpen={isOpen}
                    toggleDialog={toggleDialog}
                    handleRfidTag={handleRfidTag}
                />
            ) : (
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="h-12 w-52 text-base rounded-lg ml-auto right-0"
                >
                    <RotateCw size={20}/>
                    Scan again
                </Button>
            )}
            <div className="mt-8">
                {product &&
                    <GarmentDetailsTable
                        product={product}
                        qc={productDefects}
                    />
                }
            </div>
        </div>
    )
}

export default TrackGarmentRFID