"use client"

import axios from 'axios';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Defect, GmtData, Product, QcSectionTarget } from '@prisma/client';

import { useToast } from '@/components/ui/use-toast';
import ReadingRFIDDialogModel from '@/components/scanning-point/reading-rfid-dialog-model';
import QCHoursAndTarget from '@/components/scanning-point/qc-hours-and-target';
import QCAnalyticsChart from '@/components/scanning-point/qc-analytics-chart';
import QCQuantityCountTable from '@/components/scanning-point/qc-quantity-count-table';
import QCSubmitDialogModel from '@/components/scanning-point/qc-submit-dialog-model';
import QCMultiSelectDefects from '@/components/scanning-point/qc-multi-select-defects';
import QCRfidProductDetails from '@/components/scanning-point/qc-rfid-product-details';

type ResponseQcProductDetails = {
    id: string,
    rfidId: string,
    frontGmt: GmtData
}

interface QCDashboardPanelProps {
    defects: Defect[] | undefined;
    qcTarget: QcSectionTarget | null
}

const QCDashboardPanel = ({
    defects,
    qcTarget
}: QCDashboardPanelProps) => {
    const { toast } = useToast();
    const [rfidTag, setRfidTag] = useState<string>("")
    const [selectedDefects, setSelectedDefects] = useState<string[]>([]);
    const [qcProduct, setQcProduct] = useState<ResponseQcProductDetails | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const toggleDefect = (defect: Defect) => {
        setSelectedDefects((prev) =>
            prev.includes(defect.id) ? prev.filter(id => id !== defect.id) : [...prev, defect.id]
        );
    };

    const handleRfidTag = async (tag: string) => {
        setRfidTag(tag);
        try {
            const response = await axios.get(`/api/scanning-point/product?rfid=${tag}`);
            setQcProduct(response.data.data);
        } catch (error: any) {
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
        }
    };

    const handleSubmit = async (status: string) => {
        setIsSubmitting(true);

        if (selectedDefects && qcProduct && qcTarget) {
            const data = {
                productId: qcProduct?.id,
                qcSectionId: qcTarget?.qcSectionId,
                qcStatus: status,
                defects: selectedDefects
            };
            
            await axios.post(`/api/scanning-point/product/qc`, data)
                .then(() => {
                    toast({
                        title: "Save the QC status",
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
                    setRfidTag("");
                    setSelectedDefects([]);
                    setQcProduct(null);
                    router.refresh();
                    setIsSubmitting(false);
                });

        } else {
            toast({
                title: "Something went wrong! Please try again :(",
                variant: "error"
            });
            router.refresh();
            setIsSubmitting(false);
        }
    };

    const circleChart: CircleChartDataType = {
        total: 430,
        count: 290,
        chartName: 'Production'
    };
    const progressBar: ProgressiveBarChartDataType[] = [
        {
            label: 'DHU',
            percentage: 15.5,
        },
        {
            label: 'ACV',
            percentage: 67,
            startColor: 'green',
            endColor: 'blue'
        }
    ];
    const quantityCountData = [
        { title: 'Inspect Qty', hour: 32, day: 223 },
        { title: 'Pass Qty', hour: 32, day: 223 },
        { title: 'Rework Qty', hour: 32, day: 223 },
        { title: 'Reject Qty', hour: 32, day: 223 },
    ];

    return (
        <section className='w-full mt-4 mb-12 flex space-x-6'>
            <div className='w-1/3 space-y-4'>
                <QCHoursAndTarget qcTarget={qcTarget} />
                
                {/* RFID & Product Info */}
                {!rfidTag ?
                    <ReadingRFIDDialogModel handleRfidTag={handleRfidTag} />
                    :
                    <>
                        {qcProduct ?
                            <QCRfidProductDetails 
                                rfid={rfidTag}
                                buyerName={qcProduct.frontGmt.buyerName}
                                style={qcProduct.frontGmt.styleNo}
                            />
                            :
                            <div className='w-full min-h-40 bg-slate-100 rounded-lg border flex justify-center items-center'>
                                <Loader className='animate-spin text-slate-600'/>
                            </div>
                        }
                    </>
                }

                {rfidTag && 
                    <QCSubmitDialogModel 
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isSubmitDisabled={!qcTarget}
                        isPassDisabled={selectedDefects.length > 0}
                    />
                }

                {/* Day target - Production - DHU % - ACV % */}
                <QCAnalyticsChart circleChart={circleChart} progressBar={progressBar} />

                {/* Hourly Quantity Analytics Table */}
            </div>
            <div className='w-2/3 space-y-6'>
                <QCQuantityCountTable data={quantityCountData}/>
                
                {/* Defects List */}
                {rfidTag ?
                    <QCMultiSelectDefects 
                        defects={defects}
                        selectedDefects={selectedDefects}
                        handleToggle={toggleDefect}
                    />
                    :
                    <div className='bg-slate-100 border p-4 rounded-lg min-h-96 flex justify-center items-center text-slate-500'>
                        Please read the RFID tag!
                    </div>
                }
            </div>
        </section>
    )
}

export default QCDashboardPanel