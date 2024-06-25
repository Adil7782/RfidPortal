"use client"

import axios from 'axios';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Defect, GmtData, ProductDefect, QcSectionTarget } from '@prisma/client';

import { useToast } from '@/components/ui/use-toast';
import ReadingRFIDDialogModel from '@/components/scanning-point/reading-rfid-dialog-model';
import QCHoursAndTarget from '@/components/scanning-point/qc-hours-and-target';
import QCAnalyticsChart from '@/components/scanning-point/qc-analytics-chart';
import QCQuantityCountTable from '@/components/scanning-point/qc-quantity-count-table';
import QCSubmitDialogModel from '@/components/scanning-point/qc-submit-dialog-model';
import QCMultiSelectDefects from '@/components/scanning-point/qc-multi-select-defects';
import QCRfidProductDetails from '@/components/scanning-point/qc-rfid-product-details';
import QCHourlyQuantityTable from '@/components/scanning-point/qc-hourly-quantity-table';
import Image from 'next/image';

type ResponseQcProductDetails = {
    id: string,
    rfidId: string,
    frontGmt: GmtData
}

interface QCDashboardPanelProps {
    defects: Defect[] | undefined;
    qcTarget: QcSectionTarget | null;
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTpes[];
}

const QCDashboardPanel = ({
    defects,
    qcTarget,
    totalStatusCounts,
    currentHourStatusCounts,
    totalDHU,
    hourlyQuantity
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
                pointNo: 7,
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

    const analyticsChartData: QCAnalyticsChartDataType = {
        target: qcTarget?.dailyTarget || 0,
        count: totalStatusCounts.pass + totalStatusCounts.reject,
        dhuPercentage: totalDHU
    };

    const quantityCountData = [
        { title: 'Inspect Qty', hour: currentHourStatusCounts.totalInspect, day: totalStatusCounts.totalInspect },
        { title: 'Pass Qty', hour: currentHourStatusCounts.pass, day: totalStatusCounts.pass },
        { title: 'Rework Qty', hour: currentHourStatusCounts.rework, day: totalStatusCounts.rework },
        { title: 'Reject Qty', hour: currentHourStatusCounts.reject, day: totalStatusCounts.reject },
    ];

    return (
        <section className='w-full mt-4 mb-12 flex flex-col space-y-6'>
            {/* Quantity Analytics Table */}
            <QCQuantityCountTable data={quantityCountData} />

            <div className='flex space-x-6'>
                <div className='w-1/3 space-y-4'>
                    {/* Display Hour and Target */}
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
                                    <Loader className='animate-spin text-slate-600' />
                                </div>
                            }
                        </>
                    }

                    {/* Submit Button */}
                    {rfidTag &&
                        <QCSubmitDialogModel
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isSubmitDisabled={!qcTarget || (defects ? defects?.length === 0 : false)}
                            isPassDisabled={selectedDefects.length > 0}
                        />
                    }

                    {/* Day target - Production - DHU % - ACV % */}
                    {qcTarget &&
                        <QCAnalyticsChart analyticsChartData={analyticsChartData} />
                    }
                </div>
                <div className='w-2/3 space-y-6'>
                    {/* Defects List */}
                    {rfidTag ?
                        <QCMultiSelectDefects
                            defects={defects}
                            selectedDefects={selectedDefects}
                            handleToggle={toggleDefect}
                        />
                        :
                        <div className='bg-slate-50 p-8 rounded-lg '>
                            <div className="min-h-[484px] flex flex-col justify-center items-center bg-slate-100/80 text-slate-500 rounded-lg border border-[#0980D4]/50 border-dashed">
                                <Image
                                    src='/images/scanning-files.gif'
                                    alt="Scanning"
                                    width={600}
                                    height={200}
                                    className="mt-2 w-2/3 rounded-md"
                                />
                                <p className="mt-2 font-medium text-slate-600">
                                    Please read the RFID tag!
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {qcTarget && hourlyQuantity.length > 0 &&
                <QCHourlyQuantityTable hourlyQuantity={hourlyQuantity} />
            }
        </section>
    )
}

export default QCDashboardPanel